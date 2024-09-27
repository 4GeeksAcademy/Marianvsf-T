import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import List from "./list";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1 className="text-center mt-5">todo List!</h1>		
			<List/>
			<p className="fixed-bottom">
				Made by Marian Suárez{" "} on 
				<a href="http://www.4geeksacademy.com"> 4Geeks Academy!</a>
			</p>
		</div>
	);
};

export default Home;
