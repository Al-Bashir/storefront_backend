import envConfig from '../config/envConfig';
import bcrypt from 'bcrypt';

export const hashing = (plaintext: string): string => {
    const rounds = parseInt(envConfig.SALT_ROUNDS as string);
    const salt = bcrypt.genSaltSync(rounds);
    const hash = bcrypt.hashSync(`${plaintext}${envConfig.HASH_STRING}`, salt);
    return hash;
};

export const passwordCheck = (plaintext: string, hashedPasswords: string): boolean => {
    return bcrypt.compareSync(`${plaintext}${envConfig.HASH_STRING}`, hashedPasswords);
};
