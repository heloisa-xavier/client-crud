import {StyledPaper} from "./styles.ts";
import {Outlet} from 'react-router-dom';

const GlobalLayout = () => {
    return (
        <>
            <h1 className="title">Client CRUD</h1>
            <StyledPaper>
                <Outlet/>
            </StyledPaper>
        </>
    );
}

export default GlobalLayout;