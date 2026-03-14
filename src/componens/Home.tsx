import Coins from './Coins';
import { useDispatch } from 'react-redux'
import { resetSliders } from '../store/selectedSlidersSlice';



const Home = () => {
    const dispatch = useDispatch();

    return (
        <main>
            <div id="toolBar">
                <button id="resetButton" title="Reset" onClick={() => dispatch(resetSliders())}></button>
            </div>
            <Coins />

        </main>
    )
}

export default Home;