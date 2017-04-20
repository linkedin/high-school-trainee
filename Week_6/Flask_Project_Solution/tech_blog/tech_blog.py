from flask import Flask, render_template, request, Response, json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = "secret key"
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/tech_blog'
db = SQLAlchemy(app)


class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    username = db.Column(db.String(15), nullable=False)
    created = db.Column(db.DateTime)
    lastModified = db.Column(db.DateTime)
    content = db.Column(db.String(1000))

    def __init__(self, username, content):
        self.username = username
        self.content = content


@app.route('/home/')
def list_blog_posts():
    posts = BlogPost.query.order_by(BlogPost.id.desc())
    return render_template('main.html', posts=posts)


@app.route('/add', methods=['POST'])
def add_blog_posts():
    data = request.form
    if data["blog_content"] != "":
        post = BlogPost(content=data["blog_content"], username="default")
        db.session.add(post)
        db.session.commit()
        js = json.dumps('{"message":"success"}')
        return Response(js, status=200, mimetype='application/json')
    else:
        js = json.dumps('{"message": "failed"}')
        return Response(js, status=400, mimetype='application/json')



if __name__ == '__main__':
    app.run(debug=True)
