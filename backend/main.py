from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File
from fastapi.responses import StreamingResponse
from PIL import Image
import io
from rembg import remove

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running!"}


@app.get("/test")
def test():
    print("test endpoint hit")
    return {"message": "Frontend connected successfully"}

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    input_image = await file.read()

    output_image = remove(input_image)

    return StreamingResponse(
        io.BytesIO(output_image),
        media_type="image/png"
    )

