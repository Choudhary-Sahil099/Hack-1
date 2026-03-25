from pydantic import BaseModel

class PredictionInput(BaseModel):
    state: str
    district: str
    commodity: str