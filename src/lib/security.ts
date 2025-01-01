import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import { randomBytes } from "crypto";

const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_KEY = crypto.randomBytes(32); // Replace with a secure key
const IV = crypto.randomBytes(16);

export const encryptText = (text: string): string => {
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, IV);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return `${IV.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decryptText = (encryptedText: string): string => {
  const [ivHex, encryptedHex] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');
  
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString('utf8');
};

export const hashText = async (text: string): Promise<string> => {
  const salt = genSaltSync(10);
  return hashSync(text as string, salt) as string;
}

export const compareHash = async (encryptedText: string, hashText: string): Promise<Boolean> => {
  return compareSync(encryptedText, hashText)
}

export const generateRandomID = (length: number): string => {
  const bytes = randomBytes(length);
  return bytes.toString('base64').replace(/\+/g, '0').replace(/\//g, '1').slice(0, length);
}
