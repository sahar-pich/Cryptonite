import { useSelector, useDispatch } from 'react-redux';
import { setSlider } from '../store/selectedSlidersSlice';

type Coins = {
    id: string,
    symbol: string,
    name: string,
    image: string,
}

const PopUp = () => {
    const coins: Coins[] = useSelector((state: any) => state.coins.data);

    const selectedSliders = useSelector((state: any) => state.selectedSliders)
    const dispatch = useDispatch()

    const lastSelectedName = coins.find((coin) => coin.id === selectedSliders.at(-1))?.name

    const lastSelected = selectedSliders.at(-1)
    const cancelLastSelection = () => {
        dispatch(setSlider(lastSelected))
    }

    return (
        <>
            <div id="popupOverlay"></div>
            <div id="popup">
                <h3 id="popupHeader">Maximum Coins Reached</h3>
                <p id="popupBody">You can select <strong>up to 5 coins</strong> for comparison.<br />To add <span id="popupLastSelected">{lastSelectedName}</span>, please choose one to remove.</p>
                <ul>
                    {
                        selectedSliders.slice(0, 5).map((slider: string) => {

                            return (
                                <li key={slider} className="deleteListItem" onClick={() => dispatch(setSlider(slider))}>
                                    ❌ {coins.find(coin => coin.id === slider)?.name}
                                </li>
                            )
                        }
                        )
                    }
                </ul>
                <div id="popupButtonsDiv">
                    <button id="popupCloseButton" onClick={cancelLastSelection}>CANCEL</button>
                </div>
            </div >
        </>
    )
}

export default PopUp;