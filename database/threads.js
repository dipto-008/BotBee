const Thread = require("../models/thread");
const fs = require('fs');
//const dataPath = `${__dirname}/threads.json`;

//let jsonData = loadJSONData();

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

function updateJSONThread(threadId, updateData) {
  const index = jsonData.findIndex((thread) => thread.threadId === threadId);
  if (index !== -1) {
    jsonData[index] = { ...jsonData[index], ...updateData };
  saveJSONData(jsonData);
  }
}

function deleteJSONThread(threadId) {
  jsonData = jsonData.filter((thread) => thread.threadId !== threadId);
 saveJSONData(jsonData);
}

module.exports = {
  async createThread(threadData) {
    try {
      const thread = new Thread(threadData);
      await thread.save();
/*
      const existingIndex = jsonData.findIndex(t => t.threadId === threadData.threadId);
      if (existingIndex === -1) {
        jsonData.push(threadData);
      } else {
        jsonData[existingIndex] = { ...jsonData[existingIndex], ...threadData };
      }

      saveJSONData(jsonData);*/
      return thread;
    } catch (error) {
      console.error("Error creating thread:", error);
      throw error;
    }
  },

  async getThread(threadId) {
    try {
      return await Thread.findOne({ threadId });
    } catch (error) {
      console.error("Error fetching thread:", error);
      throw error;
    }
  },async get(threadId) {
    try {
      return await Thread.findOne({ threadId });
    } catch (error) {
      console.error("Error fetching thread:", error);
      throw error;
    }
  },

  async updateThread(threadId, updateData) {
    try {
      const updatedThread = await Thread.findOneAndUpdate({ threadId }, updateData, { new: true });
      /*if (updatedThread) {
        updateJSONThread(threadId, updateData);
      }*/
      return updatedThread;
    } catch (error) {
      console.error("Error updating thread:", error);
      throw error;
    }
  },async set(threadId, updateData) {
    try {
      const updatedThread = await Thread.findOneAndUpdate({ threadId }, updateData, { new: true });
      /*if (updatedThread) {
        updateJSONThread(threadId, updateData);
      }*/
      return updatedThread;
    } catch (error) {
      console.error("Error updating thread:", error);
      throw error;
    }
  },async setThread(threadId, updateData) {
    try {
      const updatedThread = await Thread.findOneAndUpdate({ threadId }, updateData, { new: true });
     /* if (updatedThread) {
        updateJSONThread(threadId, updateData);
      }*/
      return updatedThread;
    } catch (error) {
      console.error("Error updating thread:", error);
      throw error;
    }
  },

  async setThreadData(threadId, updateData) {
    try {
      const updatedThread = await Thread.findOneAndUpdate({ threadId }, updateData, { new: true });
     /* if (updatedThread) {
        updateJSONThread(threadId, updateData);
      }*/
      return updatedThread;
    } catch (error) {
      console.error("Error setting thread data:", error);
      throw error;
    }
  },

  async set(threadId, updateData) {
    try {
      const updatedThread = await Thread.findOneAndUpdate({ threadId }, updateData, { new: true });
      /*if (updatedThread) {
        updateJSONThread(threadId, updateData);
      }*/
      return updatedThread;
    } catch (error) {
      console.error("Error setting thread data:", error);
      throw error;
    }
  },

  async deleteThread(threadId) {
    try {
      const deletedThread = await Thread.findOneAndDelete({ threadId });
     /* if (deletedThread) {
        deleteJSONThread(threadId);
      }*/
      return deletedThread;
    } catch (error) {
      console.error("Error deleting thread:", error);
      throw error;
    }
  },async delete(threadId) {
    try {
      const deletedThread = await Thread.findOneAndDelete({ threadId });
      /*if (deletedThread) {
        deleteJSONThread(threadId);
      }*/
      return deletedThread;
    } catch (error) {
      console.error("Error deleting thread:", error);
      throw error;
    }
  },

  async getAllThreads() {
    try {
      return await Thread.find({});
    } catch (error) {
      console.error("Error fetching all threads:", error);
      throw error;
    }
  },async getAll() {
    try {
      return await Thread.find({});
    } catch (error) {
      console.error("Error fetching all threads:", error);
      throw error;
    }
  }
};