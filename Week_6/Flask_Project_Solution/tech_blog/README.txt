===== DATABASE SETUP =====

To set up the database, run these commands:

1) create database tech_blog;
2) use tech_blog;
3) create table blog_post (id integer not null auto_increment, username varchar(15) not null, created datetime default current_timestamp on update current_timestamp, lastModified datetime default current_timestamp on update current_timestamp, content varchar(1000), primary key (id));