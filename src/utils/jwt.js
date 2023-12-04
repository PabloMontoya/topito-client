import * as jose from 'jose';

const alg = 'RS256';
const pkcs8 = atob(process.env.REACT_APP_ENCODED_PRIVATE_KEY);

export const decodeJwt = (jwt) => jose.decodeJwt(jwt);

export const signJwt = async (payload) => {
  const privateKey = await jose.importPKCS8(pkcs8, alg);
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .sign(privateKey);

  return jwt;
};
