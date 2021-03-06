import React , {useEffect} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Checkout from './Checkout';
import Payment from './Payment';
import Login from './Login';
import {auth} from './firebase';
import { useStateValue } from './Stateprovider';

function App() {

  const [{},dispatch] = useStateValue();

  useEffect(() => {
   //will only run once when app component loads

   //onAuthStateChanged func is always listening. if we login or logout, it'll refire the code written below
   auth.onAuthStateChanged(authUser => {
     console.log(authUser);

     if(authUser){
       //the user just logged in/the user was logged in
        dispatch({ //shoot the user in the data layer
          type: 'SET_USER',
          user:authUser
        })
     }
     else{
       //the user is logged out
       dispatch({ //eradicate the user in the data layer
        type: 'SET_USER',
        user: null 
      })

     }
   })
  }, [])

  return (
    //BEM
    <Router>
      <div className="App">
        <Switch >
        <Route path="/login">
             <Login/>
          </Route>
          
          <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>

          <Route path="/payment">
            <Header/>
            <Payment/>
          </Route>

          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
