from pydantic import BaseModel

class EbayItem(BaseModel):
    item_id: str
    container_id: str
    listing_status: str