import css from "./Filters.module.css";

const LANGUAGES = [
  "French",
  "English",
  "German",
  "Ukrainian",
  "Polish",
  "Spanish",
  "Italian",
  "Mandarin Chinese",
  "Korean",
  "Vietnamese",
];

const LEVELS = [
  "A1 Beginner",
  "A2 Elementary",
  "B1 Intermediate",
  "B2 Upper-Intermediate",
  "C1 Advanced",
  "C2 Proficient",
];

const PRICES = ["10", "20", "25", "30", "35", "40", "45", "50"];

export default function Filters({ filters, onFilterChange, onReset }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const hasActiveFilters = Boolean(
    filters.language || filters.level || filters.price
  );

  return (
    <div className={css.filtersContainer}>
      {/* Languages Filter */}
      <div className={css.filterGroup}>
        <label htmlFor="language" className={css.label}>
          Languages
        </label>
        <div className={css.selectWrapper}>
          <select
            id="language"
            name="language"
            value={filters.language}
            onChange={handleChange}
            className={`${css.select} ${css.langSelect}`}
          >
            <option value="">All languages</option>
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Level Filter */}
      <div className={css.filterGroup}>
        <label htmlFor="level" className={css.label}>
          Level of knowledge
        </label>
        <div className={css.selectWrapper}>
          <select
            id="level"
            name="level"
            value={filters.level}
            onChange={handleChange}
            className={`${css.select} ${css.levelSelect}`}
          >
            <option value="">All levels</option>
            {LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Filter */}
      <div className={css.filterGroup}>
        <label htmlFor="price" className={css.label}>
          Price
        </label>
        <div className={css.selectWrapper}>
          <select
            id="price"
            name="price"
            value={filters.price}
            onChange={handleChange}
            className={`${css.select} ${css.priceSelect}`}
          >
            <option value="">All prices</option>
            {PRICES.map((price) => (
              <option key={price} value={price}>
                {price} $
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Butonu */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className={css.resetBtn}
        >
          Reset filters
        </button>
      )}
    </div>
  );
}