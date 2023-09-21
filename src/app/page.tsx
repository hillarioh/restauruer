"use client";
import { useState } from "react";
import PostcodeInput from "@/components/PostCodeInput";

export default function Home() {
  const [selectedPostcode, setSelectedPostcode] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handlePostcodeSelect = (latLng: { lat: number; lng: number }) => {
    setSelectedPostcode(latLng);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-semibold mb-4">Restaurant Finder</h1>
      <PostcodeInput onPostcodeSelect={handlePostcodeSelect} />
    </main>
  );
}
