===== HOW TO START THE APP =====

Inside the tech_blog directory, run these following commands to set up the virtual environment:

1) sudo pip install virtualenv
2) virtualenv venv
3) . venv/bin/activate
4) pip install -r requirements.txt

You will only need to run the above commands once. From now on, to use the app, simply run ". venv/bin/activate" to start up the virtual environment, and then run "python tech_blog.py" to start the app server. Step 4 takes care of installing all necessary libraries into
the virtual environment, and allows for version control of what libraries to use.

===== DATABASE SETUP =====

To set up the database, run these commands inside MySQL:

1) create database tech_blog;
2) use tech_blog;
3) create table blog_post (id integer not null auto_increment, username varchar(15) not null, created datetime default current_timestamp on update current_timestamp, lastModified datetime default current_timestamp on update current_timestamp, content varchar(1000), primary key (id));

You will only need to run the above commands once.
