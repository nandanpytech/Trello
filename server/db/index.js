const sequelize = require('./dbConnection');

const db = {};
db.sequelize = sequelize;

db.userModel = require('./models/user')(sequelize);
db.registerVerifyModel = require('./models/registerVerify')(sequelize);
module.exports = db;
