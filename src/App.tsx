import { useEffect, useState } from 'react';
import axios from 'axios';

export type Crypto = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
};

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>();
  useEffect(() => {
    const url = 'https://api.coincap.io/v2/assets';
    axios.get(url).then((response) => {
      setCryptos(response.data.data);
      console.log(cryptos)
    });
  }, []);
  return (
    <div>
      <h1>Cryptocurrency Prices</h1>
      {cryptos
        ? cryptos.map((crypto) => {
            return (
              <div key={crypto.id}>
                <p>Rank: {crypto.rank}</p>
                <p>Symbol: {crypto.symbol}</p>
                <p>Name: {crypto.name}</p>
                <p>Price (USD): ${crypto.priceUsd}</p>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default App;
