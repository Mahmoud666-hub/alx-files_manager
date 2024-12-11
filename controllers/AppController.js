const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');


class AppController {
  static getStatus(requ, resp) {
    const redisLive = redisClient.isAlive();
    const dbLive = dbClient.isAlive();
    resp.status(200).json({ redis: redisLive, db: dbLive });
  }

  static async getStats(requ, resp) {
    const usersTotal = await dbClient.nbUsers();
    const filesTotal = await dbClient.nbFiles();
    resp.status(200).json({ users: usersTotal, files: filesTotal });
  }
}

export default AppController;
