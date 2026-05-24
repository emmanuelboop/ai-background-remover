import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
} from "@/components/ui/card"

type ImageComparisonProps = {
    selectedImage: string
    enhancedImage: string | null
    isLoading: boolean
    resetImages: () => void
}

function ImageComparison({ selectedImage, enhancedImage, isLoading, resetImages }: ImageComparisonProps) {

    return (
        <>
            <div className="w-full max-w-6xl flex justify-center mt-2 mb-0">
                <Button className="transition-all duration-300 hover:scale-105"
                    variant="default"
                    onClick={resetImages}
                >
                    Upload Another Image
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mt-16">
                <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                        <h2 className="text-white  text-2xl font-semibold mb-6">
                            Original Image
                        </h2>

                        <img
                            src={selectedImage}
                            alt="Preview"
                            className="w-full rounded-2xl"
                        />
                    </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                        <h2 className="text-white  text-2xl font-semibold mb-6">
                            Background Removed
                        </h2>
                        {
                            enhancedImage && !isLoading && (
                                <p className="text-white/60 mb-4 text-sm font-medium">
                                    Background Removed
                                </p>
                            )
                        }
                        <div className="flex items-center justify-center h-[400px] rounded-2xl bg-white/5 text-white/40">

                            {
                                isLoading ? (
                                    <div className="flex flex-col items-center gap-4">

                                        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>

                                        <p className="animate-pulse text-lg">
                                            Enhancing image...
                                        </p>

                                    </div>
                                ) : (
                                    enhancedImage ? (
                                        <div className="flex flex-col gap-4">

                                            <img
                                                src={enhancedImage}
                                                alt="Enhanced Preview"
                                                className="w-full h-full object-cover rounded-2xl"
                                            />

                                            <a
                                                href={enhancedImage}
                                                download="enhanced-image.png"
                                            >
                                                <Button className="w-full transition-all duration-300 hover:scale-105">
                                                    Download Image
                                                </Button>
                                            </a>

                                        </div>
                                    ) : (
                                        <p>
                                            Enhanced image will appear here
                                        </p>
                                    )
                                )

                            }
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default ImageComparison;