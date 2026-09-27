import { useState, useMemo } from "react";
import { useFavorites } from "../../Context/useFavorites";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Filters from "../../components/Filters/Filters";

const INITIAL_FILTERS = {
  language: "",
  level: "",
  price: "",
};

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Favoriler üzerinde filtreleme
  const filteredFavorites = useMemo(() => {
    return favorites.filter((teacher) => {
      if (
        filters.language &&
        !teacher.languages?.some(
          (lang) => lang.toLowerCase() === filters.language.toLowerCase()
        )
      ) {
        return false;
      }

      if (
        filters.level &&
        !teacher.levels?.some(
          (lvl) => lvl.toLowerCase() === filters.level.toLowerCase()
        )
      ) {
        return false;
      }

      if (
        filters.price &&
        Number(teacher.price_per_hour) > Number(filters.price)
      ) {
        return false;
      }

      return true;
    });
  }, [favorites, filters]);

  return (
    <section style={{ maxWidth: "1184px", margin: "0 auto", padding: "32px 16px" }}>
      {/* 1. Favori varsa filtreleme barını göster */}
      {favorites.length > 0 && (
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      )}

      {/* 2. Liste ve Boş Durum Kontrolleri */}
      {favorites.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#121417", marginTop: "40px" }}>
          You haven't added any teachers to your favorites yet.
        </p>
      ) : filteredFavorites.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#121417", marginTop: "40px" }}>
          No favorite teachers found matching your criteria.
        </p>
      ) : (
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "32px", padding: 0 }}>
          {filteredFavorites.map((teacher, index) => (
            <TeacherCard
              key={teacher.id || `${teacher.name}_${teacher.surname}_${index}`}
              teacher={teacher}
            />
          ))}
        </ul>
      )}
    </section>
  );
}