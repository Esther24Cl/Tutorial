INSERT INTO category(name) VALUES ('Eurogames');
INSERT INTO category(name) VALUES ('Ameritrash');
INSERT INTO category(name) VALUES ('Familiar');

INSERT INTO author(name, nationality) VALUES ('Alan R. Moon', 'US');
INSERT INTO author(name, nationality) VALUES ('Vital Lacerda', 'PT');
INSERT INTO author(name, nationality) VALUES ('Simone Luciani', 'IT');
INSERT INTO author(name, nationality) VALUES ('Perepau Llistosella', 'ES');
INSERT INTO author(name, nationality) VALUES ('Michael Kiesling', 'DE');
INSERT INTO author(name, nationality) VALUES ('Phil Walker-Harding', 'US');

INSERT INTO game(title, age, category_id, author_id) VALUES ('On Mars', '14', 1, 2);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Aventureros al tren', '8', 3, 1);
INSERT INTO game(title, age, category_id, author_id) VALUES ('1920: Wall Street', '12', 1, 4);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Barrage', '14', 1, 3);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Los viajes de Marco Polo', '12', 1, 3);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Azul', '8', 3, 5);

INSERT INTO client(name) VALUES ('Alice Johnson');
INSERT INTO client(name) VALUES ('Bob Smith');
INSERT INTO client(name) VALUES ('Charlie Brown');
INSERT INTO client(name) VALUES ('Diana Prince');
INSERT INTO client(name) VALUES ('Ethan Hunt');
INSERT INTO client(name) VALUES ('Koke');

INSERT INTO loan(game_id, client_id, start_date, end_date)
        VALUES ((SELECT id FROM game WHERE title = 'On Mars'),
        (SELECT id FROM client WHERE name = 'Alice Johnson'),
        '2025-03-01', '2025-04-15');
INSERT INTO loan(game_id, client_id, start_date, end_date)
        VALUES ((SELECT id FROM game WHERE title = 'Aventureros al tren'),
        (SELECT id FROM client WHERE name = 'Bob Smith'),
        '2025-03-10', '2025-04-15');
INSERT INTO loan(game_id, client_id, start_date, end_date)
        VALUES ((SELECT id FROM game WHERE title = '1920: Wall Street'),
        (SELECT id FROM client WHERE name = 'Charlie Brown'),
        '2025-04-30', '2025-07-15');
 INSERT INTO loan(game_id, client_id, start_date, end_date)
         VALUES ((SELECT id FROM game WHERE title = 'Barrage'),
         (SELECT id FROM client WHERE name = 'Diana Prince'),
         '2025-03-09', '2025-06-21');
 INSERT INTO loan(game_id, client_id, start_date, end_date)
         VALUES ((SELECT id FROM game WHERE title = 'Los viajes de Marco Polo'),
         (SELECT id FROM client WHERE name = 'Ethan Hunt'),
         '2025-05-01', '2025-09-15');
 INSERT INTO loan(game_id, client_id, start_date, end_date)
         VALUES ((SELECT id FROM game WHERE title = 'Azul'),
         (SELECT id FROM client WHERE name = 'Koke'),
         '2025-03-01', '2025-04-15');

INSERT INTO loan(game_id, client_id, start_date, end_date)
      VALUES ((SELECT id FROM game WHERE title = 'Azul'),
      (SELECT id FROM client WHERE name = 'Ethan Hunt'),
      '2025-10-16', '2025-10-20');

INSERT INTO loan(game_id, client_id, start_date, end_date)
      VALUES ((SELECT id FROM game WHERE title = 'Los viajes de Marco Polo'),
      (SELECT id FROM client WHERE name = 'Ethan Hunt'),
      '2025-10-16', '2025-10-20');