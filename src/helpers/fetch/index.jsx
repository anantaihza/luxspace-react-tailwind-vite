import { REACT_APP_API_HOST } from '../../../config';

export default function fetchData({
    url,
    method = "GET",
    host = REACT_APP_API_HOST,
    body,
}) {
    return fetch(`${host}${url}`, {
        method,
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body,
    }).then(async (response) => {
        const statusHasResponse = [200, 404];
        const jsonResponse = statusHasResponse.includes(response.status)
            ? await response.json()
            : response;

        if (response.ok) return jsonResponse;

        throw new Error(JSON.stringify(jsonResponse));
    });
}
