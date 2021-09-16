import React, { useState, useContext} from "react";
import MyContext from "../context/MyContext";
import { Link } from "react-router-dom";

const LikeButton = ({ pet}) => {
	const [likeIcon, setLikeIcon] = useState("black");
	const [loginText, setLoginText] = useState("")
	const { userId} = useContext(MyContext);
	const { login} = useContext(MyContext);

	const style={
		boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
		borderRadius: "10px",
		padding: "0.5rem",
		fontSize: "1rem"
	}
	const savePet = pet => {
		fetch(`http://localhost:4000/users/save`, {
			method: "PATCH",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user_id: userId, pet_id: pet._id }),
		})
			.then(data => data.json())
			.then(res => console.log("saving to favourites"))
			.catch(err => console.log(err.response));
	};

	return (
		<>
			{login && login ? (
				<button
					className='card__like--icon'
					data-petid={pet && pet._id}
					onClick={e => {
						likeIcon === "black"
							? setLikeIcon("#f76c6c")
							: setLikeIcon("black");
						savePet(pet);
					}}>
					<i className='fas fa-heart' style={{ color: likeIcon }}></i>
				</button>
			) : (
				<button
					className='card__like--icon'
					onClick={() => setLoginText("Login to like it")}>
					<i className='fas fa-heart' style={{ color: likeIcon }}></i>
					<Link to='/login' className='card__login-btn'>
						<button style={loginText === "" ? {display:"none"}:style}>{loginText}</button>
					</Link>
				</button>
			)}
		</>
	);
		
		
	
};

export default LikeButton;