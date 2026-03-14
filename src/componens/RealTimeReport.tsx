import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchCoins } from '../store/coinsSlice';
import AreaChartComponent from './AreaChartComponent'

type Coins = {
    id: string,
    symbol: string,
    name: string,
    image: string,
}

type Report = {
    [key: string]: {
        USD: number
    }
}

type ChartData = {
    time: string;
    [key: string]: number | string;
}

const RealTimeReport = () => {
    const dispatch = useDispatch();

    // For the Coins Data
    const coins: Coins[] = useSelector((state: any) => state.coins.data);
    // const loading = useSelector((state: any) => state.coins.loading);
    // const error = useSelector((state: any) => state.coins.error);
    const [report, setReport] = useState<Report>({})
    const [chartData, setChartData] = useState<ChartData[]>([])

    const selectedSliders = useSelector((state: any) => state.selectedSliders);
    const selectedCoins = selectedSliders
        .map((id: string) => coins.find(coin => coin.id === id)?.symbol)
        .filter(Boolean);
    const symbols = selectedCoins.join(',')

    const fetchReport = async () => {
        try {
            const response = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?tsyms=usd&fsyms=${symbols}`)
            const data = await response.json();
            setReport(data);

            const newDataPoint: ChartData = {
                time: new Date().toLocaleTimeString()
            };

            Object.entries(data).forEach(([symbol, priceData]: [string, any]) => {
                newDataPoint[symbol] = priceData.USD;
            });

            setChartData(prev => {
                const updated = [...prev, newDataPoint];
                return updated.slice(-10);
            });
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        dispatch(fetchCoins() as any);

        if (!symbols) return;

        fetchReport();

        const interval = setInterval(fetchReport, 2000);

        return () => clearInterval(interval);

    }, [symbols]);



    return (
        <>
            <div id="rtrMainDiv">
                <h2>Real Time Reporting</h2>
                <div id="reportMainDiv">
                    <h3>Latest Prices</h3>
                    {!selectedCoins.length ? <><p id="noCoinsSelected">No coins selected</p><span id="noCoinsDescription">(select some coins to view their prices)</span></> :
                        <div id="reportPrices">
                            {selectedCoins.map((slider: string) =>
                                <p key={slider}>$ {slider.toUpperCase()} {report[slider.toUpperCase()]?.USD.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</p>
                            )}
                        </div>}
                </div>
                <AreaChartComponent chartData={chartData} selectedCoins={selectedCoins} />

            </div>



        </>
    )
}

export default RealTimeReport;