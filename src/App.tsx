import { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoSummary from './components/CryptoSummary';
import { Crypto } from './Types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto | null>();
  const [data, setData] = useState<ChartData<'line'>>();
  const [options, setOptions] = useState<ChartOptions<'line'>>({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Crypto Prices Over Time',
      },
    },
  });

  useEffect(() => {}, []);

  useEffect(() => {
    const url = 'https://api.coincap.io/v2/assets';
    axios.get(url).then((response) => {
      setCryptos(response.data.data);
      // console.log(response.data);
    });
  }, []);
  return (
    <>
      <div>
        <h3>Cryptocurrency Details</h3>
        <select
          name="cryptos"
          id="cryptos"
          onChange={(e) => {
            const c = cryptos?.find((x) => x.id === e.target.value);
            setSelected(c);

            axios
              .get(
                `https://api.coincap.io/v2/assets/${
                  c?.id
                }/history?interval=d1&start=${
                  Date.now() - 31 * 24 * 60 * 60 * 1000
                }&end=${Date.now()}`
              )
              .then((response) => {
                const responseData = response.data.data;
                console.log(responseData);

                setData({
                  labels: responseData.map((coin: { time: string }) => {
                    return new Date(coin.time).toLocaleDateString();
                  }),
                  datasets: [
                    {
                      label: 'Price (USD)',
                      data: responseData.map((coin: { priceUsd: string }) => {
                        return parseFloat(coin.priceUsd); 
                      }),
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1,
                    },
                  ],
                });
              });
          }}
          defaultValue="bitcoin"
        >
          <option value="default">Select Crypto</option>
          {cryptos
            ? cryptos.map((crypto) => {
                return (
                  <option key={crypto.id} value={crypto.id}>
                    {crypto.name}
                  </option>
                );
              })
            : null}
        </select>
      </div>
      {selected ? <CryptoSummary crypto={selected} /> : null}
      {data ? (
        <div style={{ width: 600 }}>
          <Line options={options} data={data} />
        </div>
      ) : null}
    </>
  );
}

export default App;
