import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header.js";
import Home from "./Home.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

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
