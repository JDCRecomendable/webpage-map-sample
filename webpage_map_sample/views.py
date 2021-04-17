from webpage_map_sample import app, render_template
from flask import request
import data_analysis
import json

def clean_up(coordinates):
    floats = coordinates.split(',')
    print(floats, 'AAA')
    print(float(floats[0]))
    print(float(floats[1]))
    return [float(floats[0]), float(floats[1])]

@app.route('/', methods=['GET', 'POST'])
def index(geocode=[-43.52, 172.63]):
    if request.method == 'POST':
        tleft = clean_up(request.form['tleft'])
        bright = clean_up(request.form['bright'])

        centre_x = (tleft[0] + bright[0]) / 2
        centre_y = (tleft[1] + bright[1]) / 2
        geocode = [centre_x, centre_y]

        print(tleft[0])
        print(type(tleft[0]))
        print(bright[0])
        print(type(bright[0]))
        print('AAAAAAA')

        tl, br = data_analysis.convert_coordinates(tleft, bright)
        vegetation_score = data_analysis.getvege(tl, br, 2011)
        industrialisation_score = data_analysis.getind(tl, br, 2011)
        print(vegetation_score)
        print(industrialisation_score)

        return render_template("index.html", geocode=geocode)
    else:
        # coordinates = [
        #     {
        #         "tleft": [-36.8471567, 174.7649395],
        #         "bright": [-36.8481567, 174.7659395],
        #         "area": "CBD"
        #     },
        #     {
        #         "tleft": [-36.854065, 174.779877],
        #         "bright": [-36.855065, 174.780877],
        #         "area": "Parnell"
        #     },
        #     {
        #         "tleft": [-36.8, 174.75],
        #         "bright": [-36.801, 174.751],
        #         "area": "North Shore"
        #     }
        # ]
        return render_template("index.html", geocode=geocode)#, coordinates=json.dumps(coordinates))

@app.route('/whyus/')
def whyus():
    return render_template("whyus.html")
