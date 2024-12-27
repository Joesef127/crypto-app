import { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoSummary from '../components/CryptoSummary';
import { Crypto } from '../Types';
// import { Line } from 'react-chartjs-2';
// import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  // ChartData,
  // ChartOptions,
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

export default function PortfolioCalc() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto[]>([]);

  // const [range, setRange] = useState<string>('all');

  // const [data, setData] = useState<ChartData<'line'>>();
  // const [options, setOptions] = useState<ChartOptions<'line'>>({
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     title: {
  //       display: true,
  //       text: 'Crypto Prices Over Time',
  //     },
  //   },
  // });

  useEffect(() => {
    const url = 'https://api.coincap.io/v2/assets';
    axios.get(url).then((response) => {
      setCryptos(response.data.data);
    });
  }, []);

  // const getInterval = (range: string) => {
  //   if (range === '3') return 'h1';
  //   return 'd1';
  // };

  // useEffect(() => {
  //   if (selected) {
  //     const interval = getInterval(range);
  //     const start =
  //       range !== 'all'
  //         ? Date.now() - parseInt(range) * 24 * 60 * 60 * 1000
  //         : undefined;
  //     const end = Date.now();

  //     let url = `https://api.coincap.io/v2/assets/${selected.id}/history?interval=${interval}`;
  //     if (range !== 'all') {
  //       url += `&start=${start}&end=${end}`;
  //     }

  //     axios.get(url).then((response) => {
  //       const responseData = response.data.data;

  //       setData({
  //         labels: responseData.map((coin: { time: string }) => {
  //           return moment
  //             .unix(parseInt(coin.time) / 1000)
  //             .format(interval === 'h1' ? 'HH:mm' : 'DD-MM-YY');
  //         }),
  //         datasets: [
  //           {
  //             label: 'Price (USD)',
  //             data: responseData.map((coin: { priceUsd: string }) =>
  //               parseFloat(coin.priceUsd).toFixed(2)
  //             ),
  //             backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //             borderColor: 'rgba(75, 192, 192, 1)',
  //             borderWidth: 2,
  //           },
  //         ],
  //       });
  //       setOptions({
  //         responsive: true,
  //         plugins: {
  //           legend: {
  //             display: false,
  //           },
  //           title: {
  //             display: true,
  //             text:
  //               selected?.name +
  //               ` Prices ` +
  //               (range === 'all' ? 'Of ' : 'Over ') +
  //               ((range === '3' ? '1' : undefined) ||
  //                 (range === '31' ? '30' : undefined) ||
  //                 (range === '8' ? '7' : undefined) ||
  //                 (range === 'all' ? 'All' : undefined)) +
  //               ((range === '3' ? ` Day` : undefined) ||
  //                 (range === 'all' ? ` Time` : ` Days`)),
  //           },
  //         },
  //       });
  //     });
  //   }
  // }, [selected, range]);

  return (
    <>
      <div>
        <h3>Cryptocurrency Details</h3>
        <select
          name="cryptos"
          id="cryptos"
          onChange={(e) => {
            const c = cryptos?.find((x) => x.id === e.target.value) as Crypto;
            setSelected([...selected, c]);
          }}
          defaultValue="bitcoin"
        >
          <option value="default">Select Crypto</option>
          {cryptos &&
            cryptos.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name}
              </option>
            ))}
        </select>
      </div>

            {selected.map((s) => {return <CryptoSummary crypto={s} />})}

      {/* {selected && <CryptoSummary crypto={selected} />} */}
      {/* {data ? ed554r */}
    </>
  );
}
