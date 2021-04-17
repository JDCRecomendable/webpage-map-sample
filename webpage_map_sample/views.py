from webpage_map_sample import app, render_template
from flask import request
import data_analysis
import json

coordinates = [
    {
        "tleft": [-43.5196868, 172.610767],
        "bright": [-43.5552232, 172.651950],
        "area": "Christchurch"
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

def clean_up(coordinates):
    floats = coordinates.split(',')
    print('09099009909009', floats)
    return [float(floats[0]), float(floats[1])]

@app.route('/', methods=['GET', 'POST'])
def index(geocode=[-43.52, 172.63], industrialisation_score=0.5, vegetation_score=0.5, coordinates=coordinates, year=2011, zoom=15):
    geocode = clean_up(request.form['geocode'])
    zoom = float(request.form['zoom'])
    year = min(2011, max(2013, int(request.form['year'])))
    if request.method == 'POST':
        tleft = clean_up(request.form['tleft'])
        bright = clean_up(request.form['bright'])
        update_score = request.form['updateScore']
        print(geocode, 'gggggggg')

        if update_score == 'true':
            centre_x = (tleft[0] + bright[0]) / 2
            centre_y = (tleft[1] + bright[1]) / 2
            geocode = [centre_x, centre_y]

            tl, br = data_analysis.convert_coordinates(tleft, bright)
            vegetation_score = data_analysis.getvege(tl, br, year)
            industrialisation_score = data_analysis.getind(tl, br, year)

            vegetation_score = round(vegetation_score, 4)
            industrialisation_score = round(industrialisation_score, 4)

            print(vegetation_score)
            print(industrialisation_score)

        return render_template("index.html", geocode=geocode, vegetation_score=vegetation_score, industrialisation_score=industrialisation_score, year=year, zoom=zoom, coordinates=json.dumps(coordinates))
    else:
        return render_template("index.html", geocode=geocode, vegetation_score=industrialisation_score, industrialisation_score=industrialisation_score, year=year, zoom=zoom, coordinates=json.dumps(coordinates))

@app.route('/whyus/')
def whyus():
    return render_template("whyus.html")
