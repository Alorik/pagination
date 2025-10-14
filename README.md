pagination

diving large amount of data into smaller fragments.
1 => offset pagination
	•	You tell the database:
“Skip the first N rows, and take the next M rows.”


(B) Cursor-based Pagination
	•	Instead of skipping rows, you remember the position (cursor) of the last item in the previous page.
	•	The cursor is usually a unique field (like id or createdAt).
