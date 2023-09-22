import axios from "axios";

const base_url = "https://api.yelp.com/v3/businesses/search";
const miles = "8046.72";
const term = "restaurants";

let headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API_KEY}`,
};

export const getRestaurants = async (lat: number, lng: number) => {
  let url = `${base_url}?latitude=${lat}&longitude=${lng}&radius=${miles}&categories=restaurants&sort_by=best_match&limit=10`;
  return await axios.get(url, { headers }).then((res) => res.data);
};
