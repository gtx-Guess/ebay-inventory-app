from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils import *

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/create-ebay-item")
async def query_create_ebay_item(ebay_item: EbayItem):
    print(f'New Ebay Item: {ebay_item}')
    return "Created New Item!"

@app.get('/api/get-ebay-item/{item_id}')
async def query_get_ebay_item_by_id(item_id: str):
    print(f'Get Item ID: {item_id}')
    if item_id:
        return 200
    else:
        return "Missing Item ID"
    
@app.get('/api/get-container/{container_id}')
async def query_get_container(container_id: str):
    print(f'Get Container ID: {container_id}')
    if container_id:
        return 200
    else:
        return "Missing Container ID"

# python3 -m uvicorn fast_api:app --reload