def encode_input(data):
    state_map = {
        "Haryana": 1,
        "Punjab": 2
    }

    district_map = {
        "Karnal": 1,
        "Ludhiana": 2
    }

    commodity_map = {
        "Wheat": 1,
        "Rice": 2
    }

    return [
        state_map.get(data.state, 0),
        district_map.get(data.district, 0),
        commodity_map.get(data.commodity, 0)
    ]