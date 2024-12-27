import { useEffect, useState } from 'react';
import { Crypto } from '../Types';

export type CryptoPropType = {
  crypto: Crypto;
};

export default function CryptoSummary({ crypto }: CryptoPropType): JSX.Element {
  const [amount, setAmount] = useState<string>('0');

  useEffect(() => {
    console.log(
      crypto.name,
      amount,
      parseFloat(crypto.priceUsd) * parseFloat(amount)
    );
  });

  return (
    <div>
      <p>
        Name: {crypto.name} ({crypto.symbol})
      </p>
      <p>Price (USD): ${parseFloat(crypto.priceUsd).toFixed(2)}</p>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <p>
        $
        {(parseFloat(crypto.priceUsd) * parseFloat(amount)).toLocaleString(
          undefined,
          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        )}
      </p>
    </div>
  );
}
