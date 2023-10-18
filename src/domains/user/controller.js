const User = require("./model"); //to check user exists or not
const { hashData, verifyHashedData } = require("./../../util/hashData");
const { createToken } = require("./../../util/createToken");

const authenticateUser = async (data) => {
  try {
    const { email, password } = data;
    const fetchedUser = await User.findOne({ email });
    if (!fetchedUser) {
      throw Error("Invalid email entered");
    }
    const hashedPassword = fetchedUser.password;
    const passwordMatch = await verifyHashedData(password, hashedPassword);
    if (!passwordMatch) {
      throw Error("Invalid password entered");
    }

    //create user token
    const tokenData = { userId: fetchedUser._id, email };
    const token = await createToken(tokenData);

    //assign user token
    fetchedUser.token = token;
    return fetchedUser;
  } catch (error) {
    throw error;
  }
};

const createNewUser = async (data) => {
  try {
    const { name, email, password, enroll } = data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with the provided email already exists");
    }

    //hash password
    const hashedPassword = await hashData(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      enroll,
    });

    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { createNewUser, authenticateUser };
