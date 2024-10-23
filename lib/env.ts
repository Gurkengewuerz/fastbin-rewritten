import { unstable_noStore as noStore } from 'next/cache';

const env = (key: string, isPublic: boolean = false): string => {
  noStore();
  key = key.replace(/[-.]/g, '_').toUpperCase();

  if (isPublic) {
    return process.env[`NEXT_PUBLIC_${key}`];
  }

  return process.env[key];
};

export default env;
