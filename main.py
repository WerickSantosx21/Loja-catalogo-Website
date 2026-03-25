from flask import Flask, abort, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/<page_name>')
def render_static(page_name):
    # essas são as páginas permitidas para serem renderizadas, metodo de segurança 
    allowed_pages = ['home', 'Races', 'Contact', 'About']

   
    if page_name in allowed_pages:
        return render_template(f'{page_name}.html')
    
    abort(404)
    # Se o caba tentar accesar outra pagina que não esteja na lista, ele vai receber um erro 404

    
#aqui cria uma função para lidar com erros 404.
@app.errorhandler(404)
def page_not_found(e):
    # Se não tiver, o Flask usa o padrão dele para erros 404
    try:
        return render_template('404.html'), 404
    except:
        return "404 - Página Não Encontrada", 404

if __name__ == "__main__":
    app.run(debug=True)
