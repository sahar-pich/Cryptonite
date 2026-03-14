import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../store/filterSlice';

const Navbar = () => {

    const dispatch = useDispatch();
    const filter = useSelector((state: any) => state.filter)

    return (
        <>
            <nav>
                <NavLink to='/' id="homePageLink">
                    <img id="navImage" title="Home" alt="Home Page Button" src='/Cryptonite/assets/images/cryptonite_logo_notext-cut-transparent.png' />
                    <h1 id="siteTitle">Cryptonite</h1>
                </NavLink>
                <div id="navLinks">
                    <NavLink to='/' className="navLink">Coins</NavLink>
                    <NavLink to='/rtr' className="navLink">Real Time Report</NavLink>
                    <NavLink to="/ai" className="navLink">Lex AI</NavLink>
                    <NavLink to="/about" className="navLink">About</NavLink>
                    <input id="coinSearch" type="text" placeholder=""
                        value={filter} onChange={(event) => dispatch(setFilter(event?.target.value))} />
                </div>
            </nav>
        </>
    )
}

export default Navbar;