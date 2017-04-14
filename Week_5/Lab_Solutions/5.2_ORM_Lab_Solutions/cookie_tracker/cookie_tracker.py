from flask import json, Flask, render_template, request, Response
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)                                   # we create an instance of the Flask class with our module name 
app.secret_key = "secret key"                           # for encrypting sessions; don't worry about this for now
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/cookie_tracker' # configure the database connection
db = SQLAlchemy(app)

class Cookie(db.Model):                                 # model the cookie table we have in our database
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Float, nullable=False)

    def __init__(self, name, rating):                   # constructor function
        self.name = name
        self.rating = rating

@app.route('/cookies')                                  # route decorator tells Flask what URL should trigger this function
def list_cookies():                                     # we name the function list_cookies
    cookies = Cookie.query.all()
    return render_template('main.html', cookies=cookies)# we render main.html and pass data over under the param "cookies"

@app.route('/cookie', methods=['POST'])                 # we specify that this route is only accessible as a POST to /cookie
def add_cookie():
    data = request.form                                 # get the request body
    if data["name"] == "":
        js = json.dumps('{"message": "failed!"}')
        return Response(js, status=400, mimetype='application/json')
    else:
        cookie = Cookie(name=data["name"], rating=data["rating"])
        db.session.add(cookie)
        db.session.commit()
        js = json.dumps('{"message": "success!"}')
        return Response(js, status=200, mimetype='application/json')
    

if __name__ == '__main__':                              # check if we're running the "main" function
   app.run(debug=True)                                  # run on debug mode (this allows for hot reload)
