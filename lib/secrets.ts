import env from '@/lib/env';
import {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  BinaryToTextEncoding,
  Encoding,
  createHash,
} from 'node:crypto';

// Modern type definitions
type Algorithm = 'aes-256-gcm';
type InputEncoding = Encoding;
type OutputEncoding = BinaryToTextEncoding;

// Constants
const ALGORITHM: Algorithm = 'aes-256-gcm';
const INPUT_ENCODING: InputEncoding = 'utf8';
const OUTPUT_ENCODING: OutputEncoding = 'hex';
const BYTE_LENGTH = 16;

// Get encryption key from environment
const deriveKey = (input: string): Buffer => {
  const hash = createHash('sha256');
  hash.update(input);
  return hash.digest();
};

const KEY = deriveKey(env('server-secret'));

/**
 * Encrypts data with a given key
 * @param k - Key for the data object
 * @param input - Data to encrypt
 * @returns Encrypted data string
 */
const encrypt = (k: string, input: string): string => {
  const iv = randomBytes(BYTE_LENGTH);

  const cipher = createCipheriv(ALGORITHM, KEY, iv);
  const text = JSON.stringify({
    [`${k}`]: input
  });

  let result = cipher.update(text, INPUT_ENCODING, OUTPUT_ENCODING);
  result += cipher.final(OUTPUT_ENCODING);

  const authTag = cipher.getAuthTag();

  return iv.toString(OUTPUT_ENCODING) + authTag.toString(OUTPUT_ENCODING) + result;
};

/**
 * Decrypts data with a given key
 * @param k - Key for the data object
 * @param secret - Encrypted data string
 * @returns Decrypted data
 */
const decrypt = (k: string, secret: string): string => {
  const iv = secret.slice(0, 2 * BYTE_LENGTH);
  const authtag = secret.slice(2 * BYTE_LENGTH, 4 * BYTE_LENGTH);
  const encrypted = secret.slice(4 * BYTE_LENGTH);

  if (!iv || !encrypted) {
    throw new Error('Invalid secret.');
  }

  const decipher = createDecipheriv(ALGORITHM, KEY, Buffer.from(iv, OUTPUT_ENCODING));
  decipher.setAuthTag(Buffer.from(authtag, OUTPUT_ENCODING));

  let result = decipher.update(Buffer.from(encrypted, OUTPUT_ENCODING));
  result = Buffer.concat([result, decipher.final()]);

  return JSON.parse(result.toString(INPUT_ENCODING))[k];

};

export { encrypt, decrypt };
