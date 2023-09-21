"use client";
import { useMemo, useState } from "react";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import PlacesAutocomplete from "@/components/PostCodeInput";
import { getGeocode, getLatLng } from "use-places-autocomplete";

export default function Home() {
  const [lat, setLat] = useState(27.672932021393862);
  const [lng, setLng] = useState(85.31184012689732);
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

      <div className="mb-4">
        <PlacesAutocomplete
          onAddressSelect={(address) => {
            getGeocode({ address: address }).then((results) => {
              const { lat, lng } = getLatLng(results[0]);

              setLat(lat);
              setLng(lng);
            });
          }}
        />
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
        </GoogleMap>
      </div>
    </main>
  );
}
