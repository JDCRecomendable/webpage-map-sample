from webpage_map_sample import app, render_template
import json

@app.route('/')
def index(geocode=[-36.848461, 174.763336]):
    coordinates = [
        {
            "tleft": [-36.8471567, 174.7649395],
            "bright": [-36.8481567, 174.7659395],
            "area": "CBD"
        },
        {
            "tleft": [-36.854065, 174.779877],
            "bright": [-36.855065, 174.780877],
            "area": "Parnell"
        },
        {
            "tleft": [-36.8, 174.75],
            "bright": [-36.801, 174.751],
            "area": "North Shore"
        }
    ]
    return render_template("index.html", geocode=geocode, coordinates=json.dumps(coordinates))

@app.route('/whyus/')
def whyus():
    return render_template("whyus.html")
