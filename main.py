from flask import Flask, abort, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/<page_name>')
def render_static(page_name):
    allowed_pages = ['home', 'Races', 'contact']
    if page_name in allowed_pages:
        return render_template(f'{page_name}.html')
    abort(404)

@app.errorhandler(404)
def page_not_found(e):
    try:
        return render_template('404.html'), 404
    except:
        return "404 — Página Não Encontrada", 404

if __name__ == "__main__":
    app.run(debug=True)
