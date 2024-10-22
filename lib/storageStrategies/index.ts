import FileStorageStrategy from './FileStorageStrategy';
import FirebaseStorageStrategy from './FirebaseStorageStrategy';
import S3StorageStrategy from './S3StorageStrategy';

import env from '@/lib/env';

const getStorageStrategy = () => {
  const strategy = env('storage-strategy');

  switch (strategy) {
    case 'file':
      return new FileStorageStrategy();
    case 'firebase':
      return new FirebaseStorageStrategy();
    case 's3':
      return new S3StorageStrategy();
  }
};

export {
  FileStorageStrategy,
  S3StorageStrategy,
  FirebaseStorageStrategy,

  getStorageStrategy
};
