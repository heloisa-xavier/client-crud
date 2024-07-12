import {useRoutes} from 'react-router-dom';
import {ListClient} from '../pages';


const Routes = () => {
    return useRoutes([
        {path: "/", element: <ListClient/>}
    ]);
};

export default Routes;
