import { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoSummary from './components/CryptoSummary';
import { Crypto } from './Types';


function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>();
  useEffect(() => {
    const url = 'https://api.coincap.io/v2/assets';
    axios.get(url).then((response) => {
      setCryptos(response.data.data);
    });
  }, []);
  return (
    <div>
      <h1>Cryptocurrency Prices</h1>
      {cryptos
        ? cryptos.map((crypto) => {
          return <CryptoSummary key={crypto.id} crypto={crypto} />
          })
        : null}
    </div>
  );
}

export default App;