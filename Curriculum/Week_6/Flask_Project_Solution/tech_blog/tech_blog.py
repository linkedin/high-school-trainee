from flask import Flask, jsonify, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = "secret key"
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/tech_blog'
db = SQLAlchemy(app)


class BlogPost(db.Model):
    """ BlogPost model representing a blog post. """

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    username = db.Column(db.String(15), nullable=False)
    created = db.Column(db.DateTime)
    lastModified = db.Column(db.DateTime)
    content = db.Column(db.String(1000))

    def __init__(self, username, content):
        self.username = username
        self.content = content


@app.route('/post', methods=['POST'])
def add_blog_posts():
    """ RESTful route for creating a blog post """

    data = request.form
    if 1 <= len(data["blog_content"]) < 1000:
        post = BlogPost(content=data["blog_content"], username="default")
        db.session.add(post)
        db.session.commit()
        return jsonify({"message": "Success!", "id": post.id}), 200
    else:
        return jsonify({"message": "Content length was not within the allowed limits"}), 400

@app.route('/home/')
def list_blog_posts():
    """ Route for rendering a template listing all existing blog posts """

    posts = BlogPost.query.order_by(BlogPost.id.desc())
    return render_template('main.html', posts=posts)

@app.route('/post/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def modify_blog_posts(id):
    """ RESTful routes for fetching, updating, or deleting a specific blog post """
 
    post = BlogPost.query.get(id)
    if not post:
        return jsonify({"message": "No blog post found with id " + str(id)}), 404
    if request.method == 'GET':
        return post
    elif request.method == 'PUT':
        data = request.form
        post.content = data["blog_content"]
        db.session.add(post)
        db.session.commit()
        return jsonify({"message": "Success!"}), 200
    else:
        db.session.delete(post)
        db.session.commit()
        return jsonify({"message": "Success!"}), 200


if __name__ == '__main__':
    app.run(debug=True)
