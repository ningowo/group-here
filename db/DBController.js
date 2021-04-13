const { MongoClient, ObjectId } = require("mongodb");

function DBController() {
  const dbController = {};
  const url =
    "mongodb+srv://web-team:web-team-project@clusterpersonaltecblog.vjh3y.mongodb.net/personalTecBlogDB?retryWrites=true&w=majority";

  const DB_NAME = "groupHereDB";

  dbController.create = async (colName, post) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const col = db.collection(colName);
      console.log("Collection ready, insert", colName, post);
      const res = await col.insertOne(post);
      console.log("Inserted", res);

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
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const col = db.collection(colName);
      console.log(
        "Collection ready, update",
        colName,
        query.toString(),
        updae.toString()
      );
      const res = await col.updateOne(query, update);
      console.log("updated", res);

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
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const col = db.collection(colName);
      console.log("Collection ready, delete", colName, query.toString());
      const res = await col.find(query).toArray();
      console.log("got", res);

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
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const col = db.collection(colName);
      console.log("Collection ready, delete", colName, query.toString());
      const res = await col.deleteOne(query);
      console.log("delated", res);

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
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const col = db.collection("users");
      console.log("Collection ready, get user", name);
      const user = await col.find({ username: name }).toArray();
      console.log("got", user);
      console.log(user[0].password);

      return user[0];
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  return dbController;
}

module.exports = DBController();
