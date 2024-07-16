import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import {FormClient, ListClient} from '../pages';
import GlobalLayout from "../layout/global-layout";

const Routes = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<GlobalLayout/>}>
            <Route path="/" element={<ListClient/>}/>
            <Route path="/criar-cliente" element={<FormClient/>}/>
        </Route>
    )
);

export default Routes;
