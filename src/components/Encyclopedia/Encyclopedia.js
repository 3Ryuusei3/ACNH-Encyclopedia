import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EncFooter from "./EncFooter";
import EncHeader from "./EncHeader";
import axios from "axios";
import { Posts } from "./Posts";
import { Pagination } from "./Pagination";
import FavouriteItems from "./FavouriteItems";
import Filter from "./Filter";

export default function Encyclopedia({ data }) {
	const { encyclopediaPage } = useParams();
	const currentEncPage = data.filter((item) => item.name === encyclopediaPage);
	const namePage = currentEncPage[0].name;
	const url = `https://acnhapi.com/v1a/${namePage}`;

	const [posts, setPosts] = useState([]);
	const [allPosts, setAllPosts] = useState([]);
	const [favouritePosts, setFavouritePosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(12);

	// Fetch data from the API
	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			const res = await axios.get(url);
			setPosts(res.data);
			setAllPosts(res.data);
			setLoading(false);
		};
		fetchPosts();
	}, [url]);

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = searchTerm.trim() === "" ? posts.slice(indexOfFirstPost, indexOfLastPost) : posts;

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Add to Favourites
	const addToFavourites = (itemImg) => {
		const found = favouritePosts.some((item) => item["file-name"] === itemImg["file-name"]);

		if (!found) {
			setFavouritePosts([...favouritePosts, itemImg]);
		}
	};

	// Remove from Favourites
	const removeFromFavourites = (itemImg) => {
		const updatedFavourites = favouritePosts.filter((item) => {
			return item["file-name"] !== itemImg["file-name"];
		});
		setFavouritePosts(updatedFavourites);
	};

	// Filter buttons
	// Price
	const getPriceBelow1000 = () => {
		let filteredPrices = allPosts.filter((item) => item.price < 1000);
		setPosts(filteredPrices);
	};

	const getPriceBelow2500 = () => {
		let filteredPrices = allPosts.filter((item) => item.price < 2500 && item.price >= 1000);
		setPosts(filteredPrices);
	};

	const getPriceBelow5000 = () => {
		let filteredPrices = allPosts.filter((item) => item.price < 5000 && item.price >= 2500);
		setPosts(filteredPrices);
	};

	const getPriceBelow10000 = () => {
		let filteredPrices = allPosts.filter((item) => item.price < 10000 && item.price >= 5000);
		setPosts(filteredPrices);
	};

	const getPriceAbove10000 = () => {
		let filteredPrices = allPosts.filter((item) => item.price > 10000);
		setPosts(filteredPrices);
	};

	const getAllPosts = () => {
		setPosts(allPosts);
	};
	// Shadow size
	const getShadowXS = () => {
		let filteredShadow = allPosts.filter((item) => item.shadow === "Smallest (1)" || item.shadow === "Smallest");
		setPosts(filteredShadow);
	};
	const getShadowS = () => {
		let filteredShadow = allPosts.filter((item) => item.shadow === "Small (2)" || item.shadow === "Small");
		setPosts(filteredShadow);
	};
	const getShadowM = () => {
		let filteredShadow = allPosts.filter((item) => item.shadow === "Medium (3)" || item.shadow === "Medium");
		setPosts(filteredShadow);
	};
	const getShadowL = () => {
		let filteredShadow = allPosts.filter((item) => item.shadow === "Medium (4)" || item.shadow === "Large");
		setPosts(filteredShadow);
	};
	const getShadowXL = () => {
		let filteredShadow = allPosts.filter((item) => item.shadow === "Large (5)" || item.shadow === "Largest");
		setPosts(filteredShadow);
	};
	const getShadowXXL = () => {
		let filteredShadow = allPosts.filter((item) => item.shadow === "Largest (6)");
		setPosts(filteredShadow);
	};
	const getShadowFin = () => {
		let filteredShadow = allPosts.filter((item) => item.shadow === "Largest with fin (6)");
		setPosts(filteredShadow);
	};
	const getShadowNarrow = () => {
		let filteredShadow = allPosts.filter((item) => item.shadow === "Narrow");
		setPosts(filteredShadow);
	};

	// Bugs Location
	const getLocationTree = () => {
		let filteredLocation = allPosts.filter((item) => item.availability.location === "On trees");
		setPosts(filteredLocation);
	};
	const getLocationPalmtree = () => {
		let filteredLocation = allPosts.filter((item) => item.availability.location === "On palm trees");
		setPosts(filteredLocation);
	};
	const getLocationFlying = () => {
		let filteredLocation = allPosts.filter(
			(item) => item.availability.location === "Flying" || item.availability.location === "Flying near hydrid flowers"
		);
		setPosts(filteredLocation);
	};
	const getLocationGround = () => {
		let filteredLocation = allPosts.filter((item) => item.availability.location === "On the ground");
		setPosts(filteredLocation);
	};
	const getLocationOther = () => {
		let filteredLocation = allPosts.filter(
			(item) =>
				item.availability.location !== "On the ground" &&
				item.availability.location !== "On trees" &&
				item.availability.location !== "Flying" &&
				item.availability.location !== "On palm trees"
		);
		setPosts(filteredLocation);
	};
	//Fish Location
	const getLocationPond = () => {
		let filteredLocation = allPosts.filter((item) => item.availability.location === "Pond");
		setPosts(filteredLocation);
	};
	const getLocationRiver = () => {
		let filteredLocation = allPosts.filter(
			(item) => item.availability.location === "River" || item.availability.location === "River (Mouth)"
		);
		setPosts(filteredLocation);
	};
	const getLocationSea = () => {
		let filteredLocation = allPosts.filter((item) => item.availability.location === "Sea");
		setPosts(filteredLocation);
	};
	const getLocationPier = () => {
		let filteredLocation = allPosts.filter((item) => item.availability.location === "Pier");
		setPosts(filteredLocation);
	};

	return (
		<div>
			<EncHeader namePage={namePage} />
			<main className="encyclopedia-container">
				<div className="encyclopedia-wrapper">
					<section className="top-section">
						<div className="search-container">
							<input
								className="search-input"
								type="text"
								placeholder="Search for an item..."
								onChange={(e) => {
									setSearchTerm(e.target.value);
								}}
							/>
						</div>
						<FavouriteItems
							namePage={namePage}
							favouritePosts={favouritePosts}
							removeFromFavourites={removeFromFavourites}
						/>
					</section>
					<section className="bottom-section">
						<Filter
							namePage={namePage}
							getPriceBelow1000={getPriceBelow1000}
							getPriceBelow2500={getPriceBelow2500}
							getPriceBelow5000={getPriceBelow5000}
							getPriceBelow10000={getPriceBelow10000}
							getPriceAbove10000={getPriceAbove10000}
							getAllPosts={getAllPosts}
							getShadowXS={getShadowXS}
							getShadowS={getShadowS}
							getShadowM={getShadowM}
							getShadowL={getShadowL}
							getShadowXL={getShadowXL}
							getShadowXXL={getShadowXXL}
							getShadowFin={getShadowFin}
							getShadowNarrow={getShadowNarrow}
							getLocationTree={getLocationTree}
							getLocationPalmtree={getLocationPalmtree}
							getLocationFlying={getLocationFlying}
							getLocationGround={getLocationGround}
							getLocationOther={getLocationOther}
							getLocationPond={getLocationPond}
							getLocationRiver={getLocationRiver}
							getLocationSea={getLocationSea}
							getLocationPier={getLocationPier}
						/>
						<div className="items-container">
							<Posts
								namePage={namePage}
								posts={currentPosts}
								loading={loading}
								searchTerm={searchTerm}
								addToFavourites={addToFavourites}
							/>
						</div>
					</section>
					<div>
						<Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} namePage={namePage} />
					</div>
				</div>
			</main>
			<EncFooter namePage={namePage} />
		</div>
	);
}
