CREATE TABLE users (
    id varchar(50) UNIQUE NOT NULL,
	username varchar(20) UNIQUE NOT NULL,
    email varchar(30) UNIQUE NOT NULL,
    password varchar(50) NOT NULL,
    PRIMARY KEY(id)
)