import React from "react";
import "./Header.scss";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

const Header = () => {
	const [state, dispatch] = useStateValue();
	return (
		<div className="header">
			<Link to="/">
				<img
					className="header__logo"
					src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
					alt="loho"
				/>
			</Link>
			<div className="header__search">
				<input type="text" className="header__searchInput" />
				<SearchIcon className="header__searchIcon" />
			</div>
			<div className="header__nav">
				<div className="header__option">
					<span className="header__option1">Hello Guests</span>
					<span className="header__option2">Sign In</span>
				</div>
				<div className="header__option">
					<span className="header__option1">Return</span>
					<span className="header__option2">& orders</span>
				</div>
				<div className="header__option">
					<span className="header__option1">Your</span>
					<span className="header__option2">Prime</span>
				</div>
				<Link to="/checkout">
					<div className="header__optionBasket">
						<ShoppingCartIcon />
						<span className="header__option2 header__basketCount">
							{state.basket?.length}
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Header;
