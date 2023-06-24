import "./assets/css/App.css";
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Routes,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import Cart from "./pages/Cart";
import Congratulation from "./pages/Congratulation";
import NotFound from "./pages/NotFound";
import Provider from "./helpers/hooks/useGlobalContext";

function App() {
    return (
        <Provider>
            <Router>
                <Routes>
                    <Route exact path="/" Component={HomePage} />
                    <Route
                        exact
                        path="/categories/:idc"
                        Component={DetailsPage}
                    />
                    <Route
                        path="/categories/:idc/products/:idp"
                        Component={DetailsPage}
                    />
                    <Route path="/cart" Component={Cart} />
                    <Route path="/congratulation" Component={Congratulation} />
                    <Route path="*" Component={NotFound} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
