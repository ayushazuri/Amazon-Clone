import React, { useState, useEffect } from "react";
import "./Payment.scss";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./components/CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

const Payment = () => {
	const [{ basket, user }, dispatch] = useStateValue();
	const history = useHistory();

	const stripe = useStripe();
	const elements = useElements();

	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState("");
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState(true);

	useEffect(() => {
		// generate the special stripe secret which allows us to charge a customer
		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				// Stripe expects the total in a currencies subunits
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
			});
			setClientSecret(response.data.clientSecret);
		};

		getClientSecret();
	}, [basket]);

	console.log("THE SECRET IS >>>", clientSecret);
	console.log("👱", user);

	const create_UUID = () => {
		var dt = new Date().getTime();
		var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
			/[xy]/g,
			function (c) {
				var r = (dt + Math.random() * 16) % 16 | 0;
				dt = Math.floor(dt / 16);
				return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
			}
		);
		return uuid;
	};
	const handleSubmit = async (event) => {
		// do all the fancy stripe stuff...
		event.preventDefault();
		// setProcessing(true);

		// const payload = await stripe;
		// .confirmCardPayment(clientSecret, {
		// 	payment_method: {
		// 		card: elements.getElement(CardElement),
		// 	},
		// })
		// .then(({ paymentIntent }) => {
		// 	// paymentIntent = payment confirmation

		// 	setSucceeded(true);
		// 	setError(null);
		// 	setProcessing(false);

		// 	dispatch({
		// 		type: "EMPTY_BASKET",
		// 	});

		// 	history.replace("/orders");
		// });
		//Not needed. Improv

		dispatch({
			type: "EMPTY_BASKET",
		});

		db.collection("user")
			.doc(user?.uid)
			.collection("orders")
			.doc(create_UUID())
			.set({
				basket: basket,
				amount: getBasketTotal(basket),
				email: user?.email,
			});

		setSucceeded(true);
		setError(null);
		setProcessing(false);
		history.replace("/orders");
	};

	const handleChange = (event) => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		setDisabled(event.empty);
		setError(event.error ? event.error.message : "");
	};
	return (
		<div className="payment">
			<div className="payment__container">
				<h1>Checkout {<Link to="/checkout">{basket.length} items</Link>}</h1>

				<div className="payment__section">
					<div className="payment__title">
						<h3>Delivery Address</h3>
					</div>
					<div className="payment__address">
						<p>{user?.email}</p>
						<p>Maple Leaf</p>
						<p>Powai, Mumbai</p>
					</div>
				</div>

				<div className="payment__section">
					<div className="payment__title">
						<h3>Review items and delivery</h3>
					</div>
					<div className="payment__items">
						{basket.map((item) => {
							return (
								<CheckoutProduct
									id={item.id}
									title={item.title}
									image={item.image}
									price={item.price}
									rating={item.rating}
								/>
							);
						})}
					</div>
				</div>

				<div className="payment__section">
					<div className="payment__title">
						<h3>Payment Method</h3>
					</div>
					<div className="payment__details">
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />
							<div className="payment__priceContainer">
								<CurrencyFormat
									renderText={(value) => <h3>Order Total: {value}</h3>}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"₹"}
								/>
								{/* disabled={processing || disabled || succeeded} paste this in button*/}
								<button>
									{/* <span>{processing ? <p>Processing</p> : "Buy now"}</span> */}
									Buy now
								</button>
							</div>
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;
