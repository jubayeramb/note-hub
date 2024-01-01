-- create_user:
INSERT INTO user (student_id, full_name, password, avatar) VALUES (?, ?, ?, ?);

-- login_user:
SELECT * FROM user WHERE student_id = ?;

-- get_all_notes:
SELECT 
    note.*, 
    user.full_name AS author_name, 
    user.avatar AS author_image 
FROM note 
INNER JOIN user 
ON note.user_id = user.id
ORDER BY 
    note.created_at DESC,
    note.id DESC,
    user.id DESC;