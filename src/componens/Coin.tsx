import { useState, useEffect } from 'react';

type Coin = {
    "market_data": {
        "current_price": {
            "eur": number,
            "ils": number,
            "usd": number,
        },
    },
}

type CoinProp = {
    id: string,
}

const Coin = ({ id }: CoinProp) => {
    const [coin, setCoin] = useState<Coin>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchCoin = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
            const data = await response.json();
            setCoin(data);
            setLoading(false);
            setError(null);
        }
        catch (err: any) {
            setError(err.message)
        }
    };

    useEffect(() => {
        fetchCoin();
    }, []);

    return (
        <>
            <div className='coinInner'>
                {error ?
                    <p className="coinError">{error}:<br />too many requests</p>
                    :
                    <>
                        <p className="coinCurrency">$ {loading ? '...' : coin?.market_data.current_price.usd.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</p>
                        <p className="coinCurrency">€ {loading ? '...' : coin?.market_data.current_price.eur.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</p>
                        <p className="coinCurrency">₪ {loading ? '...' : coin?.market_data.current_price.ils.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</p>
                    </>
                }
            </div>
        </>
    );
}

export default Coin;