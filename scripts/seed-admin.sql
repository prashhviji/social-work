
INSERT INTO "User" (id, email, password, role, name, "createdAt", "updatedAt")
VALUES (
  'admin-user-id', 
  'admin@project.org', 
  'admin123', 
  'ADMIN', 
  'Admin User', 
  NOW(), 
  NOW()
)
ON CONFLICT (email) 
DO UPDATE SET 
  password = 'admin123',
  role = 'ADMIN';
