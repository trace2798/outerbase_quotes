
CREATE TABLE quote (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    quote TEXT NOT NULL,
    quote_by TEXT DEFAULT 'Anonymous',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
//working
INSERT INTO quote (quote, quote_by, user_id, user_name)
VALUES ('{{request.body.quote}}', '{{request.body.quote_by}}', '{{request.body.user_id}}', '{{request.body.user_name}}');
//delete
DELETE FROM quote WHERE id = '{{request.body.id}}';
// get
SELECT * FROM quote;