const mysqlModel = require('mysql-model');

const MyAppModel = mysqlModel.createConnection({
    host: "localhost",
    user: "root",
    password: "Massacre31",
    database: "resume"
  });
   
  const Resume = MyAppModel.extend({
      tableName: "resumes",
  });
   
  resume = new Resume();
   
