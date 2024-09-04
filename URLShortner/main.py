from fastapi import FastAPI
from URLShortner.database import insertData, retriveUrl, createTable
from URLShortner.utils import generateShortUrl
from pydantic import BaseModel
from fastapi.responses import RedirectResponse
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

class UrlShortnerRequest(BaseModel):
    url: str

# app.add_event_handler("startup", createTable)

@app.post('/shorten/')
async def shortenUrl(request: UrlShortnerRequest):
    original_url = request.url
    short_url = generateShortUrl()
    insertData(original_url, short_url)
    return {"shortened_url": f"localhost:8000/{short_url}"}

@app.get('/{short_url}')
async def redirectUrl(short_url: str):
    original_url = retriveUrl(short_url)
    if original_url:
        print(original_url)
        return RedirectResponse(url=original_url)
    else:
        raise HTTPException(status_code=404, detail="URL not found")