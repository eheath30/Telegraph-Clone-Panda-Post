const{MongoClient:MongoClient}=require("mongodb"),connectionUrl=process.env.DB_CONNECTION,dbName=process.env.DB_NAME,init=async()=>(await MongoClient.connect(connectionUrl)).db(dbName);module.exports={init:init};
