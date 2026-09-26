import { useState } from "react";
import css from "./TeacherCard.module.css";

export default function TeacherCard({ teacher }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    name,
    surname,
    languages,
    levels,
    rating,
    reviews,
    price_per_hour,
    lessons_done,
    avatar_url,
    lesson_info,
    conditions,
    experience,
  } = teacher;

  return (
    <li className={css.card}>
      <div className={css.avatarWrapper}>
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          className={css.avatar}
        />
        <span className={css.onlineBadge}></span>
      </div>

      <div className={css.content}>
        <div className={css.header}>
          <div className={css.nameBlock}>
            <span className={css.subTitle}>Languages</span>
            <h3 className={css.name}>
              {name} {surname}
            </h3>
          </div>

          <div className={css.metaInfo}>
            <div className={css.metaItem}>
              <span>Lessons online</span>
            </div>
            <span className={css.divider}>|</span>

            <div className={css.metaItem}>
              <span>Lessons done: {lessons_done}</span>
            </div>
            <span className={css.divider}>|</span>

            <div className={css.metaItem}>
              <span className={css.starIcon}>★</span>
              <span>Rating: {rating}</span>
            </div>
            <span className={css.divider}>|</span>

            <div className={css.metaItem}>
              <span>Price / 1 hour: </span>
              <span className={css.price}>{price_per_hour}$</span>
            </div>

            <button type="button" className={css.heartBtn} aria-label="Add to favorites">
              <svg className={css.heartIcon} width="26" height="26">
                <use href="/icons.svg#icon-heart" />
              </svg>
            </button>
          </div>
        </div>

        <ul className={css.detailsList}>
          <li>
            <span className={css.detailLabel}>Speaks:</span>{" "}
            <span className={css.underlinedSpeaks}>{languages?.join(", ")}</span>
          </li>
          <li>
            <span className={css.detailLabel}>Lesson Info:</span> {lesson_info}
          </li>
          <li>
            <span className={css.detailLabel}>Conditions:</span> {conditions?.join(" ")}
          </li>
        </ul>

        {/* Read more butonu sadece kapalıyken görünür */}
        {!isExpanded && (
          <button
            type="button"
            className={css.readMoreBtn}
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </button>
        )}

        {/* Read more'a basılınca açılan genişletilmiş alan */}
        {isExpanded && (
          <div className={css.expandedContent}>
            <p className={css.experienceText}>{experience}</p>

            <ul className={css.reviewsList}>
              {reviews?.map((review, index) => (
                <li key={index} className={css.reviewItem}>
                  <div className={css.reviewerHeader}>
                    <div className={css.reviewerAvatar}>
                      {review.reviewer_name?.charAt(0).toUpperCase()}
                    </div>
                    <div className={css.reviewerMeta}>
                      <span className={css.reviewerName}>{review.reviewer_name}</span>
                      <div className={css.reviewerRating}>
                        <span className={css.starIcon}>★</span>
                        <span>{Number(review.reviewer_rating).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <p className={css.reviewComment}>{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className={css.levelList}>
          {levels?.map((level, index) => (
            <li
              key={index}
              className={`${css.levelBadge} ${index === 0 ? css.activeBadge : ""}`}
            >
              #{level}
            </li>
          ))}
        </ul>

        {/* Açık olduğunda deneme dersi butonu görünür */}
        {isExpanded && (
          <button type="button" className={css.bookBtn}>
            Book trial lesson
          </button>
        )}
      </div>
    </li>
  );
}
