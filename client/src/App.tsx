import { AuthService } from "./utils/auth";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Board from "./pages/Board";  // <-- Fix this import
import LoginPage from "./pages/Login";  // <-- Fix this import

const App = () => {
    return (
        <Router>
            <Route path="/login" component={LoginPage} />
            <Route
                path="/"
                render={() => (AuthService.isAuthenticated() ? <Board /> : <Redirect to="/login" />)}
            />
        </Router>
    );
};

export default App;
