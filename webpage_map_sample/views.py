from webpage_map_sample import app, render_template

@app.route('/')
def index():
    return render_template("index.html")
