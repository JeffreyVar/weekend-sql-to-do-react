CREATE TABLE list (
	id SERIAL PRIMARY KEY,
	task varchar(255),
	complete BOOLEAN DEFAULT FALSE
);

INSERT INTO "list" ("task")
VALUES ('Mow the lawn'), ('Rake the leaves');