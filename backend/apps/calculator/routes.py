from fastapi import APIRouter 
import base64
from io import BytesIO
from apps.calculator.utils import analyze_image
from schema import ImageData
from PIL import Image

router = APIRouter()

@router.post('')
async def run(data:ImageData):
    image_data = base64.b64decode(data.image.solit(',')[1])
    image_bytes = BytesIO(image_data)
    image = Image.open(image_bytes)
    responses = analyze_image(image,dict_of_vars = dict_of_vars)
    for response in responses:
        data.append(response)
    print('response in route : ',response)
    return {
        "message":"Image Processed",
        "Type" : "Success"
    }