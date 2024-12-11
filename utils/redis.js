import redis from 'redis';


class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', function(erro) {
      console.error(erro);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, function(erro, resp) {
        if (erro) {
          reject(erro);
        } else {
          resolve(resp);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, function(erro, resp) {
        if (erro) {
          reject(erro);
        } else {
          resolve(resp);
        }
      });
    });
  }

  async del(key) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, _reject) => {
      this.client.del(key, function(erro) {
        if (erro) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
