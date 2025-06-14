import CryptoJS from "crypto-js";

const SECRET = "internsNeverGuess";
const SALT = "SALT1234";
const key = CryptoJS.SHA256(SECRET);

export function decryptField(data, ivBase64) {
  try {
    const iv = CryptoJS.enc.Base64.parse(ivBase64);
    const decrypted = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    if (!plaintext.startsWith(SALT)) return null;

    const cleaned = plaintext.slice(SALT.length);
    const parts = cleaned.split(":");
    if (parts.length !== 2) return null;

    return { label: parts[0], type: parts[1] };
  } catch {
    return null;
  }
}
