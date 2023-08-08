import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

/*
const salt = await bcrypt.genSalt(10); This line generates a random "salt" value that will be used to hash the password. 
A salt is a random value that is added to the password before hashing, 
which helps to make the resulting hash more resistant to attacks like dictionary attacks and rainbow table attacks. 
The genSalt() function in bcrypt generates a random salt value using a specified "cost" value. 
The cost value determines how much CPU time is needed to calculate the hash, 
and higher cost values result in stronger hashes that are more resistant to attacks.

In this example, a cost value of 10 is used to generate the salt. 
This is a good default value that provides a good balance between security and performance. 
However, you may need to adjust the cost value based on the specific needs of your application.

const hashedPassword = await bcrypt.hash(password, salt); 
This line uses the generated salt value to hash the password. 
The hash() function in bcrypt takes two arguments: the password to be hashed, and the salt value to use for the hash. 
It then calculates the hash value using a one-way hash function and the specified salt value.

The resulting hash value is a string that represents the hashed password. 
This string can then be stored in a database or other storage mechanism to be compared against the user's password when they log in.

By using a salt value and a one-way hash function, 
bcrypt helps to ensure that user passwords are stored securely and are resistant to attacks like password cracking and brute-force attacks.

BCRYPT VS BCRYPTJS
bcrypt and bcryptjs are both popular libraries for hashing passwords in Node.js applications. 
However, bcryptjs is considered to be a better choice for a few reasons:

Cross-platform compatibility: bcrypt is a native Node.js module that uses C++ bindings, 
which can make it difficult to install and use on some platforms. bcryptjs, on the other hand, 
is a pure JavaScript implementation that works on any platform.

Security: While both bcrypt and bcryptjs use the same underlying algorithm for hashing passwords, 
bcryptjs is designed to be more resistant to certain types of attacks, such as side-channel attacks.

Ease of use: bcryptjs has a simpler and more intuitive API than bcrypt, 
which can make it easier to use and integrate into your application.

Overall, while bcrypt and bcryptjs are both good choices for hashing passwords in Node.js applications, 
bcryptjs is considered to be a better choice for its cross-platform compatibility, improved security, ease of use, 
and ongoing maintenance.
*/