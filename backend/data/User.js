import bcrypt from 'bcryptjs';

const User = [
 {
  name: 'Admin User',
  email: 'chroeng.langdy@gmail.com',
  password: bcrypt.hashSync('la931993', 10),
  isAdmin: true,
 },
];

export default User;
