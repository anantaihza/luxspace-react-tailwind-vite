import React, { useRef, useState, useCallback, useLayoutEffect } from "react";
import { addClass, removeClass } from "../../helpers/format/classNameModifier";


// Komponen ini menerima dua properti: 
// children yang digunakan untuk menampilkan konten di dalam Carousel, dan 
// refContainer yang merupakan referensi ke elemen kontainer Carousel.
export default function Carousel({ children, refContainer }) {
    // Pada bagian ini, digunakan useRef untuk membuat referensi refDragHandler yang akan digunakan untuk mengakses elemen Carousel
    // containerClientRect digunakan untuk mendapatkan informasi tentang ukuran dan posisi elemen kontainer menggunakan getBoundingClientRect().
    // index adalah state yang menyimpan indeks item saat ini yang sedang ditampilkan dalam Carousel.
    const refDragHandler = useRef(null);
    const containerClientRect = refContainer.current.getBoundingClientRect();
    const [index, setIndex] = useState(0);


    // threshold adalah jarak minimum yang harus ditempuh oleh pengguna saat melakukan geseran untuk memicu pergeseran item Carousel
    // itemToShow adalah jumlah item yang ditampilkan dalam Carousel tergantung pada lebar jendela. Jika lebar jendela kurang dari 767 piksel, maka hanya satu item yang ditampilkan, jika tidak, maka empat item yang ditampilkan.
    // DIRECTION_LEFT dan DIRECTION_RIGHT adalah konstanta string yang digunakan untuk menunjukkan arah pergeseran Carousel.
    const threshold = 100;
    const itemToShow = window.innerWidth < 767 ? 1 : 4;
    const DIRECTION_LEFT = "DIRECTION_LEFT";
    const DIRECTION_RIGHT = "DIRECTION_RIGHT";


    // Variabel-variabel ini menggunakan useRef untuk membuat referensi yang digunakan dalam logika pergeseran item Carousel. 
    // posInitial digunakan untuk menyimpan posisi awal saat pengguna mulai menyeret Carousel. 
    // posX1 dan posX2 digunakan untuk menyimpan posisi X saat pengguna melakukan gerakan seret. 
    // posFinal digunakan untuk menyimpan posisi akhir setelah pengguna selesai menyeret. 
    // isAllowShift digunakan untuk mengontrol apakah pergeseran item diizinkan saat ini. 
    // cards adalah referensi yang digunakan untuk mengakses elemen-elemen item Carousel. 
    const posInitial = useRef();
    const posX1 = useRef();
    const posX2 = useRef();
    const posFinal = useRef();
    const isAllowShift = useRef(true);
    const cards = useRef();

    // cardCount adalah jumlah total item Carousel, dan cardSize adalah lebar item Carousel pertama dalam piksel.
    const cardCount = cards.current?.length || 0;
    const cardSize = cards.current?.[0].offsetWidth || 0;

    // fnCheckIndex adalah fungsi callback yang digunakan untuk memeriksa indeks item saat ini setelah pergeseran Carousel selesai. Fungsi ini dipanggil saat terjadi peristiwa transitionend pada elemen Carousel. Fungsi ini mengatur posisi Carousel sesuai dengan indeks item saat ini dan memperbarui state index. Jika indeks berada di luar batas item yang dapat ditampilkan, maka posisi Carousel akan disesuaikan.
    const fnCheckIndex = useCallback(
        (e) => {
            // Pada baris ini, dilakukan pengecekan apakah properti propertyName dari objek peristiwa e sama dengan "left". Ini digunakan untuk memastikan bahwa peristiwa transitionend yang terjadi adalah karena perubahan properti left pada elemen Carousel.
            if (e.propertyName === "left") {

                // Pada baris ini, terdapat pengaturan waktu tunggu menggunakan setTimeout. Setelah 200 milidetik, fungsi removeClass akan dipanggil dengan argumen refDragHandler.current yang mewakili elemen Carousel, dan "transition-all duration-200" yang merupakan kelas CSS yang akan dihapus dari elemen tersebut. Tujuan dari pengaturan waktu tunggu ini adalah untuk menghapus efek transisi setelah pergeseran selesai.
                setTimeout(() => {
                    removeClass(
                        refDragHandler.current,
                        "transition-all duration-200"
                    );
                }, 200);


                // Baris ini mendefinisikan variabel isMobile yang menunjukkan apakah tampilan saat ini merupakan tampilan di perangkat mobile. Jika lebar jendela (window.innerWidth) kurang dari 767 piksel, maka isMobile akan diatur sebagai 0, jika tidak, maka diatur sebagai -1. Nilai ini akan digunakan nanti dalam perhitungan posisi Carousel.
                const isMobile = window.innerWidth < 767 ? 0 : -1;

                // Pada blok ini, dilakukan pengecekan untuk menentukan posisi Carousel yang tepat berdasarkan indeks item saat ini (index). Jika index kurang dari atau sama dengan 0, artinya kita berada di awal Carousel, maka posisi Carousel akan diatur menjadi 0 dan index diatur menjadi 0. Jika index lebih besar atau sama dengan cardCount - itemToShow, artinya kita berada di akhir Carousel, maka posisi Carousel akan diatur dengan menggesernya ke kiri sejauh (cardCount - itemToShow + isMobile) * cardSize piksel (dengan nilai negatif) dan index diatur menjadi cardCount - itemToShow. Jika index sama dengan cardCount atau cardCount - 1, artinya kita berada di item terakhir Carousel, maka posisi Carousel akan diatur dengan menggesernya ke kiri sejauh (cardCount - 1) * cardSize piksel dan index diatur menjadi cardCount - 1.
                if (index <= 0) {
                    refDragHandler.current.style.left = 0;
                    setIndex(0);
                } else if (index >= cardCount - itemToShow) {
                    refDragHandler.current.style.left = `${-(
                        (cardCount - itemToShow + isMobile) *
                        cardSize
                    )}px`;
                    setIndex(cardCount - itemToShow);
                } else if (index === cardCount || index === cardCount - 1) {
                    refDragHandler.current.style.left = `${
                        (cardCount - 1) * cardSize
                    }px`;
                    setIndex(cardCount - 1);
                }

                // Baris ini mengatur nilai dari referensi isAllowShift menjadi true. Ini menunjukkan bahwa pergeseran Carousel diizinkan setelah perubahan posisi selesai.
                isAllowShift.current = true;
            }
        },
        [cardCount, cardSize, index, itemToShow]
    );

    
    // fnShiftItem adalah fungsi callback yang digunakan untuk melakukan pergeseran item Carousel. Fungsi ini dipanggil saat pengguna melakukan gerakan seret Carousel. Fungsi ini memperbarui state index dan menggeser posisi Carousel sesuai dengan arah yang ditentukan.
    const fnShiftItem = useCallback(
        (direction) => {
            addClass(refDragHandler.current, "transition-all duration-200");

            // Pada baris ini, dilakukan pengecekan apakah nilai dari referensi isAllowShift adalah true. Jika iya, artinya pergeseran Carousel diizinkan.
            if (isAllowShift.current) {

                // Pada blok ini, dilakukan pengecekan arah pergeseran Carousel. Jika direction adalah "DIRECTION_LEFT", maka index diperbarui dengan menambahkan 1 ke nilai sebelumnya menggunakan fungsi setIndex. Selain itu, posisi Carousel diatur dengan menggesernya ke kiri sejauh cardSize piksel (dengan nilai negatif) dari posisi awal. Jika direction adalah "DIRECTION_RIGHT", maka index diperbarui dengan mengurangi 1 dari nilai sebelumnya menggunakan fungsi setIndex. Selain itu, posisi Carousel diatur dengan menggesernya ke kanan sejauh cardSize piksel dari posisi awal.
                if (direction === "DIRECTION_LEFT") {
                    setIndex((prev) => prev + 1);
                    refDragHandler.current.style.left = `${
                        posInitial.current - cardSize
                    }px`;
                } else if (direction === "DIRECTION_RIGHT") {
                    setIndex((prev) => prev - 1);
                    refDragHandler.current.style.left = `${
                        posInitial.current + cardSize
                    }px`;
                }
            }

            // Baris ini mengatur nilai dari referensi isAllowShift menjadi false. Ini menunjukkan bahwa pergeseran Carousel tidak diizinkan hingga pergeseran saat ini selesai.
            isAllowShift.current = false;
        },
        [cardSize]
    );


    // onDragMove adalah fungsi callback yang digunakan saat pengguna menyeret Carousel. Fungsi ini menghitung perubahan posisi X saat pengguna menyeret dan memindahkan posisi Carousel sesuai dengan perubahan tersebut.
    const onDragMove = useCallback(
        (e) => {

            // Pada baris ini, dilakukan pengecekan dan penanganan event. Jika event tidak ada, maka e diinisialisasi dengan window.event. Kemudian, panggilan preventDefault() digunakan untuk mencegah perilaku default dari event tersebut, seperti menggulir halaman saat drag dilakukan.
            e = e || window.event;
            e.preventDefault();

            // Pada blok ini, dilakukan pengecekan tipe event. Jika tipe event adalah "touchmove", artinya pengguna sedang melakukan drag pada perangkat dengan layar sentuh (seperti smartphone atau tablet). Dalam kasus ini, posisi horizontal saat ini (posX1) dan perubahan posisi horizontal (posX2) dihitung berdasarkan clientX dari sentuhan pertama pada event. Jika tipe event bukan "touchmove", artinya pengguna sedang melakukan drag menggunakan mouse atau perangkat lainnya yang bukan layar sentuh. Dalam kasus ini, posisi horizontal saat ini (posX1) dan perubahan posisi horizontal (posX2) dihitung berdasarkan clientX dari event
            if (e.type === "touchmove") {
                posX2.current = posX1.current - e.touches[0].clientX;
                posX1.current = e.touches[0].clientX;
            } else {
                posX2.current = posX1.current - e.clientX;
                posX1.current = e.clientX;
            }


            // Baris ini mengatur posisi left (kiri) dari elemen Carousel dengan menggesernya sejauh posX2.current piksel ke kiri. refDragHandler.current.offsetLeft mengambil posisi left (kiri) saat ini dari elemen Carousel, kemudian posX2.current dikurangi untuk menghitung posisi baru. Nilai ini diubah menjadi string dengan ditambahkan "px" dan kemudian diatur sebagai nilai dari properti style left pada elemen Carousel, sehingga terjadi pergeseran visual pada tampilan Carousel saat drag dilakukan.
            refDragHandler.current.style.left = `${
                refDragHandler.current.offsetLeft - posX2.current
            }px`;
        },
        [posX1, posX2]
    );


    // onDragEnd adalah fungsi callback yang digunakan saat pengguna selesai menyeret Carousel. Fungsi ini menentukan pergeseran Carousel berdasarkan posisi awal dan akhir, dan memanggil fnShiftItem untuk melakukan pergeseran item Carousel.
    const onDragEnd = useCallback(
        (e) => {
            e = e || window.event;
            e.preventDefault();

            // Baris ini mengambil posisi left (kiri) terakhir dari elemen Carousel setelah drag selesai dan menyimpannya ke dalam variabel posFinal.current. refDragHandler.current.offsetLeft mengambil posisi left (kiri) saat ini dari elemen Carousel.
            posFinal.current = refDragHandler.current.offsetLeft;

            // Pada blok ini, dilakukan pengecekan terhadap perbedaan posisi left (kiri) antara saat drag dimulai (posInitial.current) dan saat drag selesai (posFinal.current). Jika perbedaan tersebut lebih kecil dari nilai threshold negatif (-threshold), maka dipanggil fungsi fnShiftItem dengan argumen DIRECTION_LEFT untuk menggeser Carousel ke kiri. Jika perbedaan tersebut lebih besar dari nilai threshold (threshold), maka dipanggil fungsi fnShiftItem dengan argumen DIRECTION_RIGHT untuk menggeser Carousel ke kanan. Jika perbedaan tersebut berada di antara -threshold dan threshold, maka posisi left (kiri) elemen Carousel diatur kembali menjadi posisi awal saat drag dimulai (posInitial.current).
            if (posFinal.current - posInitial.current < -threshold) {
                fnShiftItem(DIRECTION_LEFT);
            } else if (posFinal.current - posInitial.current > threshold) {
                fnShiftItem(DIRECTION_RIGHT);
            } else {
                refDragHandler.current.style.left = `${posInitial.current}px`;
            }

            // Baris ini mengatur nilai onmouseup dan onmousemove pada document menjadi null. Hal ini dilakukan untuk menghapus event listener yang telah ditambahkan saat drag dimulai, sehingga tidak ada efek samping yang terjadi setelah drag selesai.
            document.onmouseup = null;
            document.onmousemove = null;
        },
        [fnShiftItem]
    );

    // sampe sini........................................
    // onDragStart adalah fungsi callback yang digunakan saat pengguna mulai menyeret Carousel. Fungsi ini menentukan posisi awal Carousel dan mengikat fungsi onDragEnd dan onDragMove ke peristiwa mouseup dan mousemove di dalam dokumen.
    const onDragStart = useCallback(
        (e) => {
            e = e || window.event;
            e.preventDefault();

            // Baris ini mengambil posisi left (kiri) saat ini dari elemen Carousel dan menyimpannya ke dalam variabel posInitial.current. refDragHandler.current.offsetLeft mengambil posisi left (kiri) saat ini dari elemen Carousel.
            posInitial.current = refDragHandler.current.offsetLeft;

            // Pada blok ini, dilakukan pengecekan terhadap tipe event yang terjadi. Jika tipe event adalah "touchstart" (pengguna melakukan sentuhan pada perangkat layar), maka posX1.current diatur dengan nilai e.touches[0].clientX, yang merupakan koordinat X dari titik sentuhan pengguna pada layar. Jika tipe event bukan "touchstart" (misalnya "mousedown" saat menggunakan mouse), maka posX1.current diatur dengan nilai e.clientX, yang merupakan koordinat X dari posisi kursor mouse.
            if (e.type === "touchstart") {
                posX1.current = e.touches[0].clientX;
            } else {
                posX1.current = e.clientX;
                document.onmouseup = onDragEnd;
                document.onmousemove = onDragMove;
            }
        },
        [onDragEnd, onDragMove]
    );


    // onClick adalah fungsi callback yang digunakan saat pengguna mengklik Carousel. Fungsi ini membatalkan tindakan default saat pergeseran item Carousel tidak diizinkan.
    const onClick = useCallback((e) => {
        e = e || window.event;

        // Pada baris kedua, dilakukan pengecekan terhadap nilai isAllowShift.current. Jika isAllowShift.current bernilai false (tidak diizinkan untuk pergeseran), maka e.preventDefault() dipanggil untuk mencegah perilaku default dari event klik tersebut. Dengan demikian, jika isAllowShift.current adalah false, klik pada Carousel tidak akan memiliki efek apa pun.
        !isAllowShift.current && e.preventDefault();
    }, []);


    // useLayoutEffect adalah hook yang digunakan untuk mengatur efek samping saat komponen Carousel dimuat atau diperbarui. Dalam efek samping ini, event listener ditambahkan ke elemen Carousel untuk menangani peristiwa seret, klik, dan transisi. Event listener juga dihapus saat komponen tidak lagi digunakan.
    useLayoutEffect(() => {
        const refForwardDragHandler = refDragHandler.current;

        refForwardDragHandler.onmousedown = onDragStart;
        refForwardDragHandler.addEventListener("touchstart", onDragStart);
        refForwardDragHandler.addEventListener("touchend", onDragEnd);
        refForwardDragHandler.addEventListener("touchmove", onDragMove);
        refForwardDragHandler.addEventListener("click", onClick);
        refForwardDragHandler.addEventListener("transitionend", fnCheckIndex);
        return () => {
            refForwardDragHandler.removeEventListener(
                "touchstart",
                onDragStart
            );
            refForwardDragHandler.removeEventListener("touchend", onDragEnd);
            refForwardDragHandler.removeEventListener("touchmove", onDragMove);
            refForwardDragHandler.removeEventListener("click", onClick);
            refForwardDragHandler.removeEventListener(
                "transitionend",
                fnCheckIndex
            );
        };
    }, [onDragStart, onDragEnd, onDragMove, onClick, fnCheckIndex]);


    // useLayoutEffect kedua digunakan untuk mengatur efek samping saat komponen Carousel dimuat atau diperbarui. Dalam efek samping ini, referensi cards diinisialisasi dengan elemen-elemen item Carousel.
    useLayoutEffect(() => {
        if (refDragHandler.current) {
            cards.current =
                refDragHandler.current.getElementsByClassName("card");
        }
    }, []);


    // Ini adalah bagian render dari komponen Carousel. Komponen ini mengembalikan elemen div yang mewakili Carousel. Properti ref digunakan untuk mengikat referensi refDragHandler ke elemen ini. Kelas CSS dan gaya CSS juga diterapkan pada elemen ini. Konten Carousel ditampilkan menggunakan properti children.
    return (
        <div
            ref={refDragHandler}
            className="flex -mx-4 flex-row relative"
            style={{ paddingLeft: containerClientRect.left - 16 }}
        >
            {children}
        </div>
    );
}
