import CryptoJS from "crypto-js";

let key = CryptoJS.enc.Utf8.parse("1954682168745975"); //十六位十六进制数作为秘钥
const iv = CryptoJS.enc.Utf8.parse("1954682168745975");//十六位十六进制数作为秘钥
export function Encrypt(word){

    const srcs = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}
export function Decrypt(decryptStr) {
    const decryptBase64Str = CryptoJS.enc.Base64.parse(decryptStr);
    const createCode = CryptoJS.lib.CipherParams.create({
        ciphertext: decryptBase64Str,
    });
    const decryptedData = CryptoJS.AES.decrypt(createCode, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decryptedData).toString();
}
