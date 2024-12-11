import { createClient } from 'redis';
import { promisify } from 'util';

// class to define methods for commonly used redis commands
class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', function(erro) {
      console.log(`Redis client not connected to server: ${erro}`);
    });
  }

  // check connection status and report
  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  // get value for given key from redis server
  async get(key) {
    const redisGetone = promisify(this.client.get).bind(this.client);
    const value = await redisGetone(key);
    return value;
  }

  // set key value pair to redis server
  async set(key, value, time) {
    const redisSetone = promisify(this.client.set).bind(this.client);
    await redisSetone(key, value);
    await this.client.expire(key, time);
  }

  // delete key vale pair from redis server
  async del(key) {
    const redisDelone = promisify(this.client.del).bind(this.client);
    await redisDelone(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
