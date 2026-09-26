import css from "./Hero.module.css";
import { Link } from "react-router-dom";
import heroImage from "../../assets/home.png";

export default function Hero() {
    return (
      <>
      <section className={css.heroTop}>
        {/* //Left Side */}
        <div className={css.leftHero}>
          <h1 className={css.text}>
            Unlock your potential with the best <span className={css.highlight}>language</span> tutors
          </h1>
          <p className={css.explain}>
            Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.
          </p>
          <Link to="/teachers" className={css.button}>
            Get Started
          </Link>
        </div>

        {/* //Right Side */}
        <div className={css.rightHero}>
          <img src={heroImage} alt="Hero Image" />
        </div>
       </section>

        {/* //Statistics */}
        <section className={css.heroBottom}>
        <div className={css.statistics}>
          <ul className={css.statList}>
            <li className={css.statItem}>
              <span className={css.statNumber}>32,000+</span>
              <span className={css.statText}>Experienced tutors</span>
            </li>
            <li className={css.statItem}>
              <span className={css.statNumber}>300,000+</span>
              <span className={css.statText}>5-star tutor reviews</span>
            </li>
            <li className={css.statItem}>
              <span className={css.statNumber}>120+</span>
              <span className={css.statText}>Subjects taught</span>
            </li>
            <li className={css.statItem}>
              <span className={css.statNumber}>200+</span>
              <span className={css.statText}>Tutor nationalities</span>
            </li>
          </ul>
       </div>
      </section>
      
      
      </>
      
    );
}