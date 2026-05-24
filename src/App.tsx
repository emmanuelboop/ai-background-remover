import { Button } from "@/components/ui/button"

import { useState } from "react";
import Navbar from "./components/Navbar";
import UploadCard from "./components/UploadCard";
import ImageComparison from "./components/ImageComparison";

function App() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
    const [error, setError] = useState("");

    const resetImages = () => {
        setSelectedImage(null);
        setEnhancedImage(null);
        setIsLoading(false);
    }

    const handleImageUpload = (file: File) => {
        setError("");

        const imageUrl = URL.createObjectURL(file);

        setEnhancedImage(null);
        setSelectedImage(imageUrl);
        setIsLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        fetch(`${import.meta.env.VITE_API_URL}/upload`, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.blob())
            .then((blob) => {

                const processedImageUrl = URL.createObjectURL(blob);

                setEnhancedImage(processedImageUrl);
                setIsLoading(false);

            })
            .catch((error) => {
                console.error("Error:", error);
                setError("Something went wrong while processing the image.");
                setIsLoading(false);
            });
    }
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="flex flex-col items-center justify-center py-20 px-6">
                <h1 className="text-5xl font-bold text-center max-w-3xl leading-tight">
                    Remove Backgrounds With AI
                </h1>
                <p className="mt-6 text-white/60 text-lg text-center max-w-2xl">
                    Upload images and instantly remove backgrounds using AI.
                </p>

                {
                    error && (
                        <p className="text-red-400 mt-4">
                            {error}
                        </p>
                    )
                }
                <Button
                    className="mt-8 transition-all duration-300 hover:scale-105"
                    onClick={() => {
                        document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    Get Started
                </Button>

                {

                    !selectedImage && (
                        <UploadCard handleImageUpload={handleImageUpload} />
                    )
                }
                {

                    selectedImage && (
                        <ImageComparison
                            selectedImage={selectedImage}
                            enhancedImage={enhancedImage}
                            isLoading={isLoading}
                            resetImages={resetImages}
                        />
                    )
                }

            </main>
            <footer className="border-t border-white/10 mt-24 py-8 text-center text-white/40 text-sm">

                Built by Emmanuel Olabisi

            </footer>
        </div>
    )

}

export default App;