CREATE TABLE list (
	id SERIAL PRIMARY KEY,
	task varchar(255)
);

INSERT INTO "list" ("task")
VALUES ('Mow the lawn'), ('Rake the leaves');