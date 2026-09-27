import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logoIcon from "../../assets/logo.svg";
import { FiLogIn } from "react-icons/fi";
import { useAuth } from "../../Context/useAuth";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import LogInModal from "../LogInModal/LogInModal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import css from "./Header.module.css";

export default function Header() {
  const { user, logOut } = useAuth();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLogInOpen, setIsLogInOpen] = useState(false)
  const navigate = useNavigate()


  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("Successfully logged out. See you soon!");
      navigate("/"); 
    } catch {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const getLinkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <header className={css.header}>
      <div className={css.container}>
        {/* logo */}
        <Link to="/" className={css.logo}>
          <img src={logoIcon} alt="LearnLingo Logo" className={css.logoIcon} />
          <span className={css.logoText}>LearnLingo</span>
        </Link>

        {/* navigation */}
        <nav className={css.nav}>
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to="/teachers" className={getLinkClass}>
            Teachers
          </NavLink>
          {user && (
            <NavLink to="/favorites" className={getLinkClass}>
              Favorites
            </NavLink>
          )}
        </nav>

        {/* right buttons */}
        <div className={css.buttons}>
          {user ? (
            <div className={css.userWrapper}>
              <span className={css.userName}>{user.displayName || "User"}</span>
              <button
                type="button"
                className={css.logOutBtn}
                onClick={handleLogOut}
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                className={css.logInBtn}
                onClick={() => setIsLogInOpen(true)}
              >
                <FiLogIn className={css.logInIcon} />
                <span>Log In</span>
              </button>
              <button
                type="button"
                className={css.registerBtn}
                onClick={() => setIsRegisterOpen(true)}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>

      {isRegisterOpen && (
        <RegistrationModal onClose={() => setIsRegisterOpen(false)} />
      )}
      {isLogInOpen && (
        <LogInModal onClose={() => setIsLogInOpen(false)} />
      )}
    </header>
  );
}