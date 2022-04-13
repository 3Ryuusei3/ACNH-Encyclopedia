import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ItemDetails({ data }) {
	const { encyclopediaPage } = useParams();
	const currentEncPage = data.filter((item) => item.name === encyclopediaPage);
	const namePage = currentEncPage[0].name;
	const url = `https://acnhapi.com/v1a/${namePage}`;

	const [posts, setPosts] = useState([]);

	// Fetch data from the API
	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			const res = await axios.get(url);
			setPosts(res.data);
			setLoading(false);
		};
		fetchPosts();
	}, []);

	const { itemPage } = useParams();
	const currentItem = posts.filter((post) => post.name["name-USen"].replace(/\s+/g, "-").toLowerCase() === itemPage);
	console.log(currentItem);

	return (
		<main className="item-details-page">
			<div className="item-details-container"></div>
		</main>
	);
}
