import { Crypto } from '../Types';

export type CryptoPropType = {
  crypto: Crypto;
};

export default function CryptoSummary({ crypto }: CryptoPropType): JSX.Element {
  return (
    <div>
      <p>Rank: {crypto.rank}</p>
      <p>Symbol: {crypto.symbol}</p>
      <p>Name: {crypto.name}</p>
      <p>Price (USD): ${crypto.priceUsd}</p>
    </div>
  );
}
