const { MongoClient, ObjectId } = require("mongodb");

function DBController() {
  const dbController = {};
  // please hide the database credentials!!
  const url =
    "mongodb+srv://web-team:web-team-project@clusterpersonaltecblog.vjh3y.mongodb.net/personalTecBlogDB?retryWrites=true&w=majority";

  const DB_NAME = "groupHereDB";

  dbController.create = async (colName, post) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const col = db.collection(colName);
      const res = await col.insertOne(post);

      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  dbController.update = async (colName, query, update) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const col = db.collection(colName);
      const res = await col.updateOne(query, update);

      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  dbController.query = async (colName, query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const col = db.collection(colName);
      const res = await col.find(query).toArray();

      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  dbController.delete = async (colName, query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const col = db.collection(colName);
      const res = await col.deleteOne(query);

      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  dbController.findUserByName = async (name) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const col = db.collection("users");
      const user = await col.find({ username: name }).toArray();

      return user[0];
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  return dbController;
}

module.exports = DBController();
