import React, {useState} from 'react';
import {ChakraProvider, LightMode, theme} from '@chakra-ui/react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './routes/Common/LandingPage';
import AdminLogin from './routes/Common/AdminLogin';
import UserSignUp from './routes/Common/UserSignUp';
import UserLogin from './routes/Common/UserLogin';
import AdminHome from './routes/Admin/Home';
import UserHome from './routes/User/Home'
import UserAccount from './routes/User/UserAccount';
import UserOrderHistory from './routes/User/OrderHistory';
import UserQuery from './routes/User/Query';
import PendingOrders from "./routes/Admin/PendingOrders";
import AllOrders from "./routes/Admin/AllOrders";
import Queries from "./routes/Admin/Queries";
import httpClient from "./utilities/httpClient";
import IndividualQuery from "./routes/Admin/IndividualQuery";
import IndividualOrder from "./routes/Admin/IndividualOrder";

const checkSession = async setIsLoggedIn => {
    try {
        let result = await httpClient({
            method: 'GET',
            url: `${process.env.REACT_APP_API_HOST}/user/session`,
        });
        if (result) {
            return setIsLoggedIn(true);
        }
        return setIsLoggedIn(false);
    } catch (err) {
        return setIsLoggedIn(false);
    }
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    checkSession(setIsLoggedIn);

    return (
        <ChakraProvider theme={theme}>
            <LightMode>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/'>
                            <LandingPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                        </Route>
                        <Route exact path='/user/signup'>
                            <UserSignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                        </Route>
                        <Route exact path='/user/login'>
                            <UserLogin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                        </Route>
                        <Route exact path='/user/home'>
                            <UserHome isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                        </Route>
                        <Route exact path='/user/account'>
                            <UserAccount isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                        </Route>
                        <Route exact path='/user/orders'>
                            <UserOrderHistory isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                        </Route>
                        <Route exact path='/user/query'>
                            <UserQuery isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                        </Route>
                        <Route exact path='/admin/login'>
                            <AdminLogin/>
                        </Route>
                        <Route exact path='/admin/home'>
                            <AdminHome/>
                        </Route>
                        <Route exact path='/admin/pending-orders'>
                            <PendingOrders/>
                        </Route>
                        <Route exact path='/admin/pending-orders/:id'>
                            <IndividualOrder/>
                        </Route>
                        <Route exact path='/admin/all-orders'>
                            <AllOrders/>
                        </Route>
                        <Route exact path='/admin/queries'>
                            <Queries/>
                        </Route>
                        <Route exact path='/admin/query/:id'>
                            <IndividualQuery/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </LightMode>
        </ChakraProvider>
    );
}

export default App;