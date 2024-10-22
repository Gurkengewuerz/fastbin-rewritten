import env from '@/lib/env';
import {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  BinaryToTextEncoding,
  Encoding,
} from 'node:crypto';

// Modern type definitions
type Algorithm = 'aes-256-gcm';
type InputEncoding = Encoding;
type OutputEncoding = BinaryToTextEncoding;

interface EncryptedData {
  iv: string;
  authTag: string;
  content: string;
}

// Constants
const ALGORITHM: Algorithm = 'aes-256-gcm';
const INPUT_ENCODING: InputEncoding = 'utf8';
const OUTPUT_ENCODING: OutputEncoding = 'hex';
const BYTE_LENGTH = 16;

// Get encryption key from environment
const KEY = env('server-secret');

/**
 * Encrypts data with a given key
 * @param k - Key for the data object
 * @param input - Data to encrypt
 * @returns Encrypted data string
 */
const encrypt = (k: string, input: string): string => {
  try {
    // Generate initialization vector
    const iv = randomBytes(BYTE_LENGTH);

    // Create cipher instance
    const cipher = createCipheriv(ALGORITHM, KEY, iv);

    // Prepare data
    const data = JSON.stringify({ [k]: input });

    // Encrypt data
    const encryptedContent = Buffer.concat([
      cipher.update(data, INPUT_ENCODING),
      cipher.final(),
    ]);

    // Get authentication tag
    const authTag = cipher.getAuthTag();

    // Combine all components
    const result: EncryptedData = {
      iv: iv.toString(OUTPUT_ENCODING),
      authTag: authTag.toString(OUTPUT_ENCODING),
      content: encryptedContent.toString(OUTPUT_ENCODING),
    };

    // Return concatenated string
    return Object.values(result).join('');
  } catch (error) {
    throw new Error(`Encryption failed: ${(error as Error).message}`);
  }
};

/**
 * Decrypts data with a given key
 * @param k - Key for the data object
 * @param secret - Encrypted data string
 * @returns Decrypted data
 */
const decrypt = (k: string, secret: string): string => {
  try {
    // Extract components
    const iv = secret.slice(0, 2 * BYTE_LENGTH);
    const authTag = secret.slice(2 * BYTE_LENGTH, 4 * BYTE_LENGTH);
    const encrypted = secret.slice(4 * BYTE_LENGTH);

    // Validate input
    if (!iv || !encrypted || !authTag) {
      throw new Error('Invalid encrypted data format');
    }

    // Create decipher instance
    const decipher = createDecipheriv(
      ALGORITHM,
      KEY,
      Buffer.from(iv, OUTPUT_ENCODING),
    );

    // Set auth tag
    decipher.setAuthTag(Buffer.from(authTag, OUTPUT_ENCODING));

    // Decrypt data
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encrypted, OUTPUT_ENCODING)),
      decipher.final(),
    ]);

    // Parse and return result
    return JSON.parse(decrypted.toString(INPUT_ENCODING))[k];
  } catch (error) {
    throw new Error(`Decryption failed: ${(error as Error).message}`);
  }
};

export { encrypt, decrypt };
