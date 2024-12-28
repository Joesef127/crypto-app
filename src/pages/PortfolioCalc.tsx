import { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoSummary from '../components/CryptoSummary';
import { Crypto, CryptoWithAmount } from '../Types';
import { Pie } from 'react-chartjs-2';
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
  ArcElement,
  ChartData,
  // ChartData,
  // ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioCalc() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<CryptoWithAmount[]>([]);

  const [data, setData] = useState<ChartData<'pie'>>();

  useEffect(() => {
    const url = 'https://api.coincap.io/v2/assets';
    axios.get(url).then((response) => {
      setCryptos(response.data.data);
    });
  }, []);

  useEffect(() => {
    console.log('SELECTED: ', selected);
    if (selected.length === 0) return;
    setData({
      labels: selected.map((s) => s.name),
      datasets: [
        {
          label: '# of Votes',
          data: selected.map((s) => s.amount * parseFloat(s.priceUsd)),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [selected]);

  function updateAmount(crypto: CryptoWithAmount, amount: number): void {
    // console.log('updateAmount: ', crypto, amount);
    let temp = [...selected];
    let tempObj = temp.find((c) => c.id === crypto.id);
    if (tempObj) {
      tempObj.amount = amount;
      setSelected(temp);
    }
  }

  return (
    <>
      <div>
        <h3>Cryptocurrency Details</h3>
        <select
          name="cryptos"
          id="cryptos"
          onChange={(e) => {
            const c = cryptos?.find(
              (x) => x.id === e.target.value
            ) as CryptoWithAmount;
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

      {selected.map((s) => {
        return <CryptoSummary crypto={s} updateAmount={updateAmount} />;
      })}

      {/* {selected && <CryptoSummary crypto={selected} />} */}

      {data ? (
        <div style={{ width: 900 }}>
          <Pie data={data} />
        </div>
      ) : null}

      <div style={{ marginTop: 10 }}>
        {selected
          ? 'Your total portfolio value is $' +
            selected
              .map((s) => {
                if (isNaN(s.amount)) {
                  return 0;
                }
                return parseFloat(s.priceUsd) * s.amount;
              })
              .reduce((prev, current) => {
                console.log('prev:', prev, 'current:', current);
                return prev + current;
              }, 0)
              .toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
          : null}
      </div>
    </>
  );
}
