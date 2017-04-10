from flask import json, Flask, render_template, request, Response
app = Flask(__name__)                                   # we create an instance of the Flask class with our module name 
app.secret_key = "secret key"                           # for encrypting sessions; don't worry about this for now

@app.route('/cookies')                                  # route decorator tells Flask what URL should trigger this function
def list_cookies():                                     # we name the function list_cookies
    data = [
        {"name": "chocolate chip", "rating": 5},
        {"name": "oatmeal raisin", "rating": 1},
        {"name": "snickerdoodle", "rating": 3}
    ]
    return render_template('main.html', cookies=data)   # we render main.html and pass data over under the param "cookies"

@app.route('/cookie', methods=['POST'])                 # we specify that this route is only accessible as a POST to /cookie
def add_cookie():
    data = request.form                                 # get the request body
    if data["name"] == "":
        js = json.dumps('{"message": "failed!"}')
        return Response(js, status=400, mimetype='application/json')
    else:
        js = json.dumps('{"message": "success!"}')
        return Response(js, status=200, mimetype='application/json')
    
if __name__ == '__main__':                              # check if we're running the "main" function
   app.run(debug=True)                                  # run on debug mode (this allows for hot reload)

