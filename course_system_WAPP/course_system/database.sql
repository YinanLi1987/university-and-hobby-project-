CREATE TABLE usrInfo (
    userId SERIAL,
    fname VARCHAR(255) NOT NULL,
	lname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phoneNumber INTEGER NOT NULL,
	userType VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (userId),
    UNIQUE(email)
);