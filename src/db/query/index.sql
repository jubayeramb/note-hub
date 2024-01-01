-- create_user:
INSERT INTO user (student_id, full_name, password, avatar) VALUES (?, ?, ?, ?);

-- login_user:
SELECT * FROM user WHERE student_id = ?;

-- get_all_notes:
SELECT 
    note.*, 
    group_concat(image.image_url) AS images,
    user.full_name AS author_name, 
    user.avatar AS author_image
FROM note
LEFT JOIN image ON note.id = image.note_id
INNER JOIN user ON note.user_id = user.id
GROUP BY note.id
ORDER BY 
    note.created_at DESC,
    note.id DESC,
    user.id DESC;

-- create_note:
INSERT INTO note (user_id, title, content) VALUES (?, ?, ?);
INSERT INTO image (note_id, image_url)
SELECT LAST_INSERT_ID(), jt.value FROM JSON_TABLE(?, '$[*]' COLUMNS(value VARCHAR(255) PATH '$')) AS jt;

