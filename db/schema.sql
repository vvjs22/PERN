DROP DATABASE IF EXISTS userlog;
CREATE database userlog;


CREATE TABLE IF NOT EXISTS "questions"(
  "id" SERIAL PRIMARY KEY,
  "question" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "userresponses"(
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "questionId" INTEGER NOT NULL references "questions" ("id"),
  "response" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  ALTER TABLE userresponses ADD CONSTRAINT unique_user_id UNIQUE (userId);
);

CREATE TABLE IF NOT EXISTS "chatgptpassages"(
  "id" SERIAL PRIMARY KEY,
  "passage" VARCHAR(1000) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  "userId" INTEGER NOT NULL references "userresponses" ("id"),
  "openAIResponse" VARCHAR(1000) NOT NULL
);



