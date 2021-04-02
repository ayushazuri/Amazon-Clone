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
import NotAvailable from "./NotAvailable";
import Footer from "./components/Footer";

const promise = loadStripe(
	"pk_test_51IaFqGSBS3td2NV9p4FvsY9MSxP5W1livyNKfAV6WMEUH4I6rzsMKCmXrWRJMJ7rumlhHSJniSav9lBsr7k48zR900CPmFSbBg"
);

function App() {
	const [{}, dispatch] = useStateValue();

	useEffect(() => {
		// will only run once when the app component loads...

		auth.onAuthStateChanged((authUser) => {
			console.log("THE USER IS >>> ", authUser);

			if (authUser) {
				// the user just logged in / the user was logged in

				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				// the user is logged out
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
						<Footer />
					</Route>
					<Route path="/orders">
						<Header />
						<Orders />
						<Footer />
					</Route>
					<Route path="/payment">
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
						<Footer />
					</Route>
					<Route path="/notavailable">
						<Header />
						<NotAvailable />
						<Footer />
					</Route>
					<Route path="/">
						<Header />
						<Home />
						<Footer />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
