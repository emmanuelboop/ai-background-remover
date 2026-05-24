import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
} from "@/components/ui/card"

type UploadCardProps = {
    handleImageUpload: (file: File) => void
}

function UploadCard({ handleImageUpload }: UploadCardProps) {

    return (
        <Card className="w-full max-w-2xl mt-16 bg-white/5 border-white/10"
            onDragOver={(e) => {
                e.preventDefault()
            }}
            onDrop={(e) => {
                e.preventDefault()

                const file = e.dataTransfer.files?.[0]

                if (file) {
                    handleImageUpload(file)
                }
            }}
            id = "upload-section"

        >
            <CardContent className="flex flex-col items-center justify-center py-20">
                <p className="text-lg font-medium text-white/90">
                    Drag and Drop Your Image
                </p>
                <p className="text-white/50 mt-2">
                    PNG, JPG up to 10MB
                </p>
                <Button className="mt-6 transition-all duration-300 hover:scale-105"
                    onClick={() => {
                        document.getElementById('image-upload')?.click()
                    }

                    }
                >
                    Browse Files
                </Button>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            handleImageUpload(file);
                        }
                    }}
                />
            </CardContent>
        </Card>

    )
}

export default UploadCard;