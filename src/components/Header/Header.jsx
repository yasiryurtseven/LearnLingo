import { NavLink, Link } from "react-router-dom";
import logoIcon from "../../assets/logo.svg"
import { FiLogIn } from "react-icons/fi"
import css from "./Header.module.css";

export default function Header() {
    const getLinkClass = ({ isActive}) => 
        isActive ?  `${css.link} ${css.active}` : css.link

    return (
        <header className={css.header}>
            <div className={css.container}>
                {/* //logo */}
                <Link to="/" className={css.logo}> 
                  <img src={logoIcon} alt="LearnLingo Logo" className={css.logoIcon} />
                  <span className={css.logoText}>LearnLingo</span>
                </Link>
                {/* //navigation */}
                <nav className={css.nav}>
                    <NavLink to="/" className={getLinkClass}>Home</NavLink>
                    <NavLink to="/teachers" className={getLinkClass}>Teachers</NavLink>
                    <NavLink to="/favorites" className={getLinkClass}>Favorites</NavLink>
                </nav>
                {/* //right buttons */}
                <div className={css.buttons}>
                    <button type="button" className={css.logInBtn}>
                    <FiLogIn className={css.logInIcon}/>
                    <span>Log In</span>
                    </button>
                    <button type="button" className={css.registerBtn}>
                      Registration
                    </button>

                </div>


            </div>
            

        </header>
        
    )
}