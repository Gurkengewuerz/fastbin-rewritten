import IStorageStrategy from './IStorageStrategy';

import Firebase from '@/lib/firebase';

class FirebaseStorageStrategy implements IStorageStrategy {
  async create(params) {
    await new Firebase().upload(params.key, params.contents);
  }

  async get(key: string) {
    return new Firebase().read(key);
  }

  getStream(key: string) {
    return new Firebase().getStream(key);
  }

  async exists(key: string) {
    return new Firebase().exists(key);
  }

  async delete(key: string) {
    return new Firebase().delete(key);
  }
}

export default FirebaseStorageStrategy;
