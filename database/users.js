const User = require('../models/user');
const fs = require('fs');
const path = require('path');

//const dataPath = path.join(__dirname, 'users.json');

function loadJSONData() {
  try {
    if (fs.existsSync(dataPath)) {
      return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    } else {
      fs.writeFileSync(dataPath, JSON.stringify([]));
      return [];
    }
  } catch (error) {
    console.error('Error loading JSON data:', error);
    return [];
  }
}

function saveJSONData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving JSON data:', error);
  }
}

//let jsonData = loadJSONData();

module.exports = {
  async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
/*
      const index = jsonData.findIndex((user) => user.userId === userData.userId);
      if (index === -1) {
        jsonData.push(userData);
      } else {
        jsonData[index] = { ...jsonData[index], ...userData };
      }
      saveJSONData(jsonData);
*/
      return user;
    } catch (error) {
      console.error('Error creating user in MongoDB:', error.message);
      if (error.code === 11000) {
        console.error('Duplicate Key Error: A user with this ID already exists.');
      }
    }
  },

  async getUser(userId) {
    try {
      const user = await User.findOne({ userId });
      if (user) return user;
/*
      const userFromJson = jsonData.find((user) => user.userId === userId);
      return userFromJson || null;*/
    } catch (error) {
      console.error('Error getting user:', error.message);
    }
  },async get(userId) {
    try {
      const user = await User.findOne({ userId });
      if (user) return user;

    /*  const userFromJson = jsonData.find((user) => user.userId === userId);
      return userFromJson || null;*/
    } catch (error) {
      console.error('Error getting user:', error.message);
    }
  },

  async updateUser(userId, updateData) {
    try {
      const updatedUser = await User.findOneAndUpdate({ userId }, updateData, {
        new: true,
        runValidators: true,
      });
/*
      const index = jsonData.findIndex((user) => user.userId === userId);
      if (index !== -1) {
        jsonData[index] = { ...jsonData[index], ...updateData };
        saveJSONData(jsonData);
      }*/

      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  },async setUser(userId, updateData) {
    try {
      const updatedUser = await User.findOneAndUpdate({ userId }, updateData, {
        new: true,
        runValidators: true,
      });
/*
      const index = jsonData.findIndex((user) => user.userId === userId);
      if (index !== -1) {
        jsonData[index] = { ...jsonData[index], ...updateData };
        saveJSONData(jsonData);
      }*/

      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  },async set(userId, updateData) {
    try {
      const updatedUser = await User.findOneAndUpdate({ userId }, updateData, {
        new: true,
        runValidators: true,
      });

    /*  const index = jsonData.findIndex((user) => user.userId === userId);
      if (index !== -1) {
        jsonData[index] = { ...jsonData[index], ...updateData };
        saveJSONData(jsonData);
      }*/

      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  },

  async deleteUser(userId) {
    try {
      const deletedUser = await User.findOneAndDelete({ userId });

     /* const index = jsonData.findIndex((user) => user.userId === userId);
      if (index !== -1) {
        jsonData.splice(index, 1);
        saveJSONData(jsonData);
      }
*/
      return deletedUser;
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  },async delete(userId) {
    try {
      const deletedUser = await User.findOneAndDelete({ userId });

    /*  const index = jsonData.findIndex((user) => user.userId === userId);
      if (index !== -1) {
        jsonData.splice(index, 1);
        saveJSONData(jsonData);
      }*/

      return deletedUser;
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  },

  async getAllUsers() {
    try {
      const users = await User.find({});
     /* const jsonUsers = jsonData.filter(
        (jsonUser) =>
          !users.some((mongoUser) => mongoUser.userId === jsonUser.userId)
      );*/

      return users//[...users, ...jsonUsers];
    } catch (error) {
      console.error('Error getting all users:', error.message);
    }
  },async getAll() {
    try {
      const users = await User.find({});
      /*const jsonUsers = jsonData.filter(
        (jsonUser) =>
          !users.some((mongoUser) => mongoUser.userId === jsonUser.userId)
      );*/

      return users//[...users, ...jsonUsers];
    } catch (error) {
      console.error('Error getting all users:', error.message);
    }
  },

  async getName(userId) {
    try {
      const user = await this.getUser(userId);
      return user ? `${user.firstName} ${user.lastName || ''}` : 'Telegram user';
    } catch (error) {
      console.error('Error getting user name:', error.message);
    }
  },
};