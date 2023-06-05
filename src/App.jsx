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

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" Component={HomePage} />
                    <Route path="/categories/:idc" Component={DetailsPage} />
                    <Route path="/cart" Component={Cart} />
                    <Route path="/congratulation" Component={Congratulation} />
                    <Route path="*" Component={NotFound} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
