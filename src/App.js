import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header.js";
import Home from "./Home.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
	"pk_test_51IaFqGSBS3td2NV9p4FvsY9MSxP5W1livyNKfAV6WMEUH4I6rzsMKCmXrWRJMJ7rumlhHSJniSav9lBsr7k48zR900CPmFSbBg"
);

function App() {
	const [{}, dispatch] = useStateValue();
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			console.log("The user iss => ", authUser);
			if (authUser) {
				//Logged in
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				//Logged Out
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);
	document.title = "Amazon Clone";
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/checkout">
						<Header />
						<Checkout />
					</Route>
					<Route path="/orders">
						<Header />
						<Orders />
					</Route>
					<Route path="/payment">
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					<Route path="/">
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
