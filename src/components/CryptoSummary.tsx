import { useEffect, useState } from 'react';
import { CryptoWithAmount } from '../Types';

export type CryptoPropType = {
  crypto: CryptoWithAmount;
  updateAmount: (crypto: CryptoWithAmount, amount: number) => void;
};

export default function CryptoSummary({
  crypto,
  updateAmount,
}: CryptoPropType): JSX.Element {
  const [amount, setAmount] = useState<number>(crypto.amount || NaN);

  return (
    <div>
      <div
        style={{ marginBottom: 10, marginTop: 10, display: 'flex', gap: 10 }}
      >
        <span>
          Name: {crypto.name} ({crypto.symbol})
        </span>
        <span>Price (USD): ${parseFloat(crypto.priceUsd).toFixed(2)}</span>
      </div>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => {
          const newAmount = parseFloat(e.target.value);
          setAmount(newAmount);
          updateAmount(crypto, newAmount);
        }}
      />
      <p>
        {isNaN(amount)
          ? '$0.00'
          : '$' +
            (parseFloat(crypto.priceUsd) * amount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
      </p>
    </div>
  );
}
