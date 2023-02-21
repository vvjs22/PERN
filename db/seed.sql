\c userlog;

INSERT INTO "questions" ("question", "createdAt", "updatedAt") VALUES 
  ('What is your name?', 'TIMESTAMP', 'CURRENT_TIMESTAMP'),
  ('What is your favorite color?', 'TIMESTAMP', 'CURRENT_TIMESTAMP'),
  ('What is your favorite food?', 'CURRENT_TIMESTAMP', 'CURRENT_TIMESTAMP');

INSERT INTO "userresponses" ("userId", "questionId", "response", "createdAt", "updatedAt") VALUES 
  (1, 1, 'My name is John', 'TIMESTAMP', 'CURRENT_TIMESTAMP'),
  (1, 2, 'My favorite color is blue', 'TIMESTAMP', 'CURRENT_TIMESTAMP'),
  (1, 3, 'My favorite food is pizza', 'TIMESTAMP', 'CURRENT_TIMESTAMP');

INSERT INTO "chatgptpassages" ("passage", "createdAt", "updatedAt", "userId") VALUES 
  ('My name is John. My favorite color is blue. My favorite food is pizza.', 'TIMESTAMP', 'CURRENT_TIMESTAMP', 1);

