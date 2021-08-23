import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import NotFoundPage from "./components/pages/NotFoundPage";
import ProtectedRoute from "./components/hoc/ProtectedRoute";
import StudentSignInPage from "./components/pages/StudentSignInPage";
import { CssBaseline } from "@material-ui/core";
import StudentPortalHome from "./components/pages/StudentPortalHome";

function App(): JSX.Element {
    const loggedIn = useAppSelector((state: RootState) => state.auth.loggedIn);

    return (
        <>
            <CssBaseline />
            <Router>
                {/* <SchoolHeader /> */}
                {/* <Appbar /> */}
                <Switch>
                    <Route path="/" exact>
                        <StudentSignInPage />
                    </Route>
                    <ProtectedRoute
                        path="/studentPortal"
                        isAuth={loggedIn}
                        component={StudentPortalHome}
                    />
                    <Route path="/">
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
