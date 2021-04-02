import React, { useState, useEffect } from "react";
import "./Orders.scss";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import Order from "./components/Order.js";
import "./components/Order.scss";
import CheckoutProduct from "./components/CheckoutProduct";

const Orders = () => {
	const [{ basket, user }, dispatch] = useStateValue();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (user) {
			db.collection("user")
				.doc(user?.uid)
				.collection("orders")
				.orderBy("created", "desc")
				.onSnapshot((snapshot) =>
					setOrders(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					)
				);
			console.log(orders);
		} else {
			setOrders([]);
		}
	}, [user]);

	console.log(orders);
	return (
		<div className="orders">
			<h1>Still in work</h1>

			<div className="orders__order">
				{orders?.map((order) => {
					return (
						<>
							<Order order={order} />
							{console.log(order)}
						</>
					);
				})}
			</div>
		</div>
	);
};

export default Orders;
