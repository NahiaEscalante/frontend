import { openDB } from 'idb';
import CryptoJS from 'crypto-js';

// Función para abrir la base de datos
const getDB = async () => {
  return openDB('secure-store', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('keys')) {
        db.createObjectStore('keys', { keyPath: 'id' });
      }
    },
  });
};

// Función para almacenar la clave en IndexedDB
const storeKey = async (key) => {
  const db = await getDB();
  await db.put('keys', { id: 'secretKey', key });
};

// Función para obtener la clave desde IndexedDB
const retrieveKey = async () => {
  const db = await getDB();
  const result = await db.get('keys', 'secretKey');
  return result?.key;
};

// Generar una clave secreta
const generateSecretKey = async () => {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
  const exportedKey = await window.crypto.subtle.exportKey('raw', key);
  return arrayBufferToBase64(exportedKey);
};

// Convertir ArrayBuffer a base64
const arrayBufferToBase64 = (buffer) => {
  const binary = new Uint8Array(buffer);
  return btoa(String.fromCharCode(...binary));
};

// Convertir base64 a ArrayBuffer
const base64ToArrayBuffer = (base64) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

// Función para cargar la clave secreta
const loadSecretKey = async () => {
  let secretKey = await retrieveKey();
  if (!secretKey) {
    secretKey = await generateSecretKey();
    await storeKey(secretKey);
  }
  return secretKey;
};

// Función para cifrar datos
export const encryptData = async (data) => {
  const secretKey = await loadSecretKey();
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encryptedData;
};

// Función para descifrar datos
export const decryptData = async (encryptedData) => {
  const secretKey = await loadSecretKey();
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

// Función para eliminar la clave del IndexedDB (solo para propósitos de demostración)
export const clearSecretKey = async () => {
  const db = await getDB();
  await db.delete('keys', 'secretKey');
};

