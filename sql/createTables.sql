CREATE TABLE IF NOT EXISTS chocolates (
"id" 				SERIAL PRIMARY KEY,
"type" 				VARCHAR(45) NOT NULL,
"weight" 			INTEGER NOT NULL,
"cocoaPercentage" 	INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS sale_information (
"id" 				SERIAL PRIMARY KEY,
"price" 			DECIMAL(6,2) NOT NULL,
"inStock" 			INTEGER NOT NULL,
"chocolateId" 		INTEGER NOT NULL UNIQUE,
FOREIGN KEY ("chocolateId") 
REFERENCES chocolates ("id") 
ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews(
	"id"			SERIAL PRIMARY KEY,
	"score"			INTEGER NOT NULL,
	"comment"		TEXT NOT NULL,
	"chocolateId" 	INTEGER NOT NULL,
	FOREIGN KEY ("chocolateId")
	REFERENCES chocolates("id")
	ON DELETE RESTRICT
);
