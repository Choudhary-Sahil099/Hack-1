from fastapi import APIRouter
from app.services.prediction import predict_price
from app.schemas.input_schema import PredictionInput

router = APIRouter()

@router.post("/predict")
def predict(data: PredictionInput):
    result = predict_price(data)
    return result