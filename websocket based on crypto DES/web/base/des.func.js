import { Des } from "./des.js"

/**
 * 使用方法
 * 实例化对象 new Des()
 * 加密方法 encrypt(key,plaintext)
 * 解密方法 decrypt(key,ciphertext)
 * 示例---------------------------------------------------
 * var Des = new Des();
 * var key = 'custom key';
 * var value = '需要加密的内容'
 * var ciphertext = encrypt(key,value);//加密
 * var plaintext = decrypt(key,ciphertext);//解密
 */

export const des_key = "deskey"

//DES加密
export async function des_encrypt(msg, key) {
    //实例化
    const DesInstance = new Des(key, msg);
    //加密
    let ciphertext = DesInstance.encrypt(key, msg);

    return ciphertext
}

//DES解密
export async function des_decrypt(msg, key) {
    //实例化
    const DesInstance = new Des(key, msg);
    //解密
    let plaintext = DesInstance.decrypt(key, msg);

    return plaintext
}
