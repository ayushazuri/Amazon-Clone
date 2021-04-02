import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
const Footer = () => {
	const backToTop = () => {
		document.documentElement.scrollTop = 0;
	};
	return (
		<div className="footer">
			<div className="footer__backToTop" onClick={backToTop}>
				<h4>Back to top</h4>
			</div>
			<div className="footer__links">
				<ul>
					<h3>Get to Know Us</h3>
					<li>About us</li>
					<li>Careers</li>
					<li>Press releases</li>
					<li>Amazon cares</li>
					<li>Gift a smile</li>
				</ul>
				<ul>
					<h3>Connect with us</h3>
					<li>Facebook</li>
					<li>Twitter</li>
					<li>Instagram</li>
				</ul>
				<ul>
					<h3>Make money with us</h3>
					<li>Sell on Amazon</li>
					<li>Sell under Amazon Accelerator</li>
					<li>Amazon Global Selling</li>
					<li>Become an Affiliate</li>
					<li>Fulfilment by Amazon</li>
					<li>Advertise your Products</li>
					<li>Amazon pays on Merchants</li>
					<li>See more Make Money with Us</li>
				</ul>
				<ul>
					<h3>Let us help you</h3>
					<li>COVID-19 and Amazon</li>
					<li>Your Account</li>
					<li>Return center</li>
					<li>100% Purchase Protection</li>
					<li>Amazon App Download</li>
					<li>Amazon Assistant Download</li>
					<li>Help</li>
				</ul>
			</div>
			<div className="footer__locations">
				<Link to="/">
					<img
						className="footer__logo"
						src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
						alt="loho"
					/>
				</Link>
				<div className="footer_locationLinks">
					<a href="">India</a>
					<a href="">Australia</a>
					<a href="">Brazil</a>
					<a href="">Canada</a>
					<a href="">China</a>
					<a href="">France</a>
					<a href="">Germany</a>
					<a href="">Italy</a>
					<a href="">Japan</a>
					<a href="">Mexico</a>
					<a href="">Netherlands</a>
					<a href="">Singapore</a>
					<a href="">Spain</a>
					<a href="">United Arab Emirates</a>
					<a href="">United Kingdom</a>
					<a href="">United States</a>
				</div>
			</div>
			<div className="footer__end">
				<div className="footer__services">
					<p>AbeBooks</p>
					<p>AWS</p>
					<p>Audible</p>
					<p>DPReview</p>
					<p>IMDB</p>
					<p>ShopBOB</p>
					<p>Amazon Business</p>
					<p>Prime Now</p>
					<p>Amazon Prime Music</p>
				</div>
				<div className="footer__copyright">
					<ul>
						<li>Conditions of Use & Sale</li>
						<li>Privacy Notice</li>
						<li>Interest Based Ads</li>
						<li>© 1996-2021, Amazon.com, Inc. or its affiliates</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Footer;
