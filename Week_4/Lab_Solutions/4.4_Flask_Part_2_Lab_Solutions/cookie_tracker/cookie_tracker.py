from flask import jsonify, Flask, render_template, request
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
        return jsonify({"message": "failed!"}), 400
    else:
        return jsonify({"message": "success!"}), 200

if __name__ == '__main__':                              # check if we're running the "main" function
   app.run(debug=True)                                  # run on debug mode (this allows for hot reload)

