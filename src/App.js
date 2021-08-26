import "./assets/css/App.scss"
import {Home} from "./views/Home";
import {Nav} from "./components/Nav";

function App() {
    return (
        <div className="App">
            <Nav/>
            <Home/>
        </div>
    );
}

export default App;
