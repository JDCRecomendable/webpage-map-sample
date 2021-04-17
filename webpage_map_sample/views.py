from webpage_map_sample import app, render_template
import json

@app.route('/')
def index(geocode=[-36.848461, 174.763336]):
    coordinates = [
        {
            "lat": -36.8471567,
            "lng": 174.7649395,
            "area": "CBD"
        },
        {
            "lat": -36.854065,
            "lng": 174.779877,
            "area": "Parnell"
        },
        {
            "lat": -36.8,
            "lng": 174.75,
            "area": "North Shore"
        }
    ]
    return render_template("index.html", geocode=geocode, coordinates=json.dumps(coordinates))

@app.route('/whyus/')
def whyus():
    return render_template("whyus.html")
