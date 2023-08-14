CREATE TABLE sessions (
	"id" SERIAL PRIMARY KEY,
	"userID" INTEGER,
	"token" TEXT NOT NULL
);

CREATE TABLE users (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"cpf" VARCHAR(11) NOT NULL,
	"phone" VARCHAR(11) NOT NULL,
	"city" TEXT NOT NULL,
	"state" TEXT NOT NULL
);

CREATE TABLE products(
	"id" SERIAL PRIMARY KEY,
	"ownerId" INTEGER NOT NULL,
	"title" TEXT NOT NULL,
	"model" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"photo" TEXT NOT NULL,
	"price" MONEY NOT NULL,
	"quantity" INTEGER NOT NULL
);

