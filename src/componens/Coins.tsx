import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoins } from '../store/coinsSlice';
import { setSlider } from '../store/selectedSlidersSlice'
import Coin from './Coin';
import PopUp from './PopUp'

type Coins = {
    id: string,
    symbol: string,
    name: string,
    image: string,
}

const Coins = () => {
    const dispatch = useDispatch();

    const coins: Coins[] = useSelector((state: any) => state.coins.data);
    const loading = useSelector((state: any) => state.coins.loading);
    const error = useSelector((state: any) => state.coins.error);

    useEffect(() => {
        dispatch(fetchCoins() as any);
    }, [])

    // Filter Search
    const filter = useSelector((state: any) => state.filter)

    const filteredCoins = filter.length === 0
        ?
        coins
        :
        coins.filter((coin) =>
            coin.symbol.toLowerCase().includes(filter.toLowerCase()) ||
            coin.name.toLowerCase().includes(filter.toLowerCase())
        );

    // More / Hide Info
    const [selectedCoins, setSelectedCoins] = useState<String[]>([]);

    const handleToggle = (coinId: string) => {
        if (selectedCoins.includes(coinId)) {
            setSelectedCoins(selectedCoins.filter(id => id !== coinId))
        }
        else {
            setSelectedCoins([...selectedCoins, coinId]);
        }
    }

    // Selected Sliders
    const selectedSliders = useSelector((state: any) => state.selectedSliders)

    return (
        <>
            {loading ?
                <>
                    <div className="coinErrorCard">
                        <h3 className="loading" style={{ color: 'var(--error)', fontWeight: '600' }}>{error}</h3>
                        <img src='/assets/images/spinner.gif' style={{ filter: "saturate(50%)" }} />
                    </div>
                </>
                :
                <div id="coinsDiv">
                    {filteredCoins.map(coin =>
                        <div className="coinCard" key={coin.id}>
                            {selectedCoins.includes(coin.id)
                                ?
                                <Coin id={coin.id} />
                                :
                                <div className="coinCardTop">
                                    <div className="coinDetails">
                                        <div className="coinImageDiv">
                                            <img className="coinImage" src={coin.image} />
                                        </div>
                                        <div className="symbolNameDiv">
                                            <h3 className="coinSymbol" title={coin.symbol}>{coin.symbol.toUpperCase()}</h3>
                                            <span className="coinName" title={coin.name}>{coin.name}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="switch">
                                            <input
                                                className="coinCheckbox"
                                                type="checkbox"
                                                onChange={() => dispatch(setSlider(coin.id))}
                                                checked={selectedSliders.includes(coin.id)} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            }
                            <div className="coinCardBottom">
                                <button className={selectedCoins.includes(coin.id) ? 'closeInfoButton' : 'moreInfoButton'}
                                    onClick={() => handleToggle(coin.id)}
                                >
                                    {selectedCoins.includes(coin.id) ? 'CLOSE INFO' : 'MORE INFO'}
                                </button>
                            </div>
                        </div>
                    )}
                </div >
            }
            {selectedSliders.length > 5 && <PopUp />}
        </>
    )
}

export default Coins