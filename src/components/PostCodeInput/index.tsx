"use client";
import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

interface PostcodeInputProps {
  onPostcodeSelect: (latLng: { lat: number; lng: number }) => void;
}

const PostcodeInput: React.FC<PostcodeInputProps> = ({ onPostcodeSelect }) => {
  const [postcode, setPostcode] = useState<string>("");

  const handleSelect = async (selected: string) => {
    const results = await geocodeByAddress(selected);
    const latLng = await getLatLng(results[0]);
    onPostcodeSelect(latLng);
    setPostcode(selected);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={postcode}
        onChange={setPostcode}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="relative">
            <input
              {...getInputProps({ placeholder: "Enter postcode" })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg">
              {loading ? <div>Loading...</div> : null}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };
                return (
                  <div
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, { style })}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default PostcodeInput;
