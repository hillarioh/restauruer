import { NextResponse } from "next/server";
import { Client } from "@googlemaps/google-maps-services-js";

export async function GET(req: Request) {
  try {
    const key = process.env.GOOGLE_MAPS_API_KEY;

    if (!key) {
      return new NextResponse("Key is required", { status: 400 });
    }
    const client = new Client({});

    const response = client.elevation({
      params: {
        locations: [{ lat: 45, lng: -110 }],
        key,
      },
      timeout: 1000,
    });
    //   .then((r) => {
    //     console.log(r.data.results[0].elevation);
    //   })
    //   .catch((e) => {
    //     console.log(e.response.data.error_message);
    //   });
    return NextResponse.json(response);
  } catch (error) {
    console.log("[PLACES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
