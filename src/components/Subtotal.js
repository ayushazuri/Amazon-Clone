import React from "react";
import "./Subtotal.scss";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";

const Subtotal = () => {
	const [{ basket }, dispatch] = useStateValue();

	return (
		<div className="subtotal">
			<CurrencyFormat
				renderText={(value) => (
					<>
						<p>
							Subtotal ({basket.length} Items) : <strong>0</strong>
						</p>
						<small className="subtotal__gift">
							<input type="checkbox" />
							This order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={0}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"₹"}
			/>
			<button>Proceed to checkout</button>
		</div>
	);
};

export default Subtotal;