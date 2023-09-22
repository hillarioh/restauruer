import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { lat, lng } = body;

    const yelp_key = process.env.YELP_API_KEY;

    if (!yelp_key) {
      return new NextResponse("Yelp API Key is required", { status: 400 });
    }

    const base_url = "https://api.yelp.com/v3/businesses/search";
    const miles = "8046.72";

    let headers = {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      "Content-Type": "application/json",
    };

    let url = `${base_url}?latitude=${lat}&longitude=${lng}&radius=${miles}&categories=restaurants&sort_by=best_match&limit=10`;
    const response = axios.get(url, { headers }).then((res) => res.data);
    console.log(response);

    return NextResponse.json(response);
  } catch (error) {
    console.log("[RESTAURANT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
