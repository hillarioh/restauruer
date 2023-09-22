"use client";
import { useMemo, useState, useEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  Marker,
} from "@react-google-maps/api";
import PlacesAutocomplete from "@/components/PostCodeInput";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import axios from "axios";

export default function Home() {
  const [lat, setLat] = useState(27.672932021393862);
  const [lng, setLng] = useState(85.31184012689732);
  const [restaurants, setRestaurants] = useState([]);
  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const restaurantList = async () => {
    try {
      const response = await axios.post("/api/restaurants", { lat, lng });
      const results = response.data.businesses.map((biz: any) => ({
        lat: biz.coordinates.latitude,
        lng: biz.coordinates.longitude,
      }));

      console.log(response.data);
      setRestaurants(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    restaurantList();
  }, [lng]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex bg-white min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-semibold mb-4 text-black">
        Restaurant Finder
      </h1>

      <div className="mb-4 flex items-center">
        <div>
          <PlacesAutocomplete
            onAddressSelect={(address) => {
              getGeocode({ address: address }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);
                console.log(lat, lng);
                setLat(lat);
                setLng(lng);
              });
            }}
          />
        </div>
        <div className="text-gray-800 px-4">
          Restaurants: {restaurants.length}
        </div>
      </div>

      <div className="w-3/4 h-96">
        <GoogleMap
          options={mapOptions}
          zoom={14}
          center={mapCenter}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onLoad={() => console.log("Map Component Loaded...")}
        >
          <MarkerF
            position={mapCenter}
            onLoad={() => console.log("Marker Loaded")}
          />
          {restaurants.length > 0 ? (
            <>
              {restaurants.map((res, i) => {
                return (
                  <MarkerF
                    key={i}
                    position={res}
                    onLoad={() => console.log("Marker Loaded")}
                  />
                );
              })}
            </>
          ) : null}
        </GoogleMap>
      </div>
    </main>
  );
}
