import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routes from './routes';

function App() {
    return (
        <BrowserRouter>
            <h1 className="title">Client CRUD</h1>
            <Routes />
        </BrowserRouter>
    );
}

export default App;
