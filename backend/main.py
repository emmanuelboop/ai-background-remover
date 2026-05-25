from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File
from fastapi.responses import StreamingResponse
from PIL import Image
import io
from rembg import remove, new_session

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


session = new_session("u2netp")

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    print(f"Received file: {file.filename}")
    input_image = await file.read()
    print("created input image")

    output_image = remove(input_image, session=session)
    print("removed background")

    return StreamingResponse(
        io.BytesIO(output_image),
        media_type="image/png"
    )

