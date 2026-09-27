import { useState, useEffect, useMemo } from "react";
import { db } from "../../firebase/config";
import { ref, get } from "firebase/database";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Filters from "../../components/Filters/Filters";

const INITIAL_FILTERS = {
  language: "",
  level: "",
  price: "",
};

const ITEMS_PER_PAGE = 4;

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersRef = ref(db, "teachers");
        const snapshot = await get(teachersRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const teachersArray = Array.isArray(data)
            ? data.filter(Boolean)
            : Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
              }));

          setTeachers(teachersArray);
        } else {
          console.log("Teachers düğümü altında veri bulunamadı!");
        }
      } catch (error) {
        console.error("Veri çekerken hata oluştu: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

 
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setVisibleCount(ITEMS_PER_PAGE);
  };

 
  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  // Filtrelenmiş liste
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
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
  }, [teachers, filters]);

  const displayedTeachers = filteredTeachers.slice(0, visibleCount);


  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <section style={{ maxWidth: "1184px", margin: "0 auto", padding: "32px 16px" }}>
     
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

     
      {loading ? (
        <p style={{ textAlign: "center" }}>Uploading Teachers...</p>
      ) : filteredTeachers.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#121417" }}>
          No teachers found matching your criteria.
        </p>
      ) : (
        <>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "32px", padding: 0 }}>
            {displayedTeachers.map((teacher, index) => (
              <TeacherCard key={teacher.id || index} teacher={teacher} />
            ))}
          </ul>

          
          {visibleCount < filteredTeachers.length && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "64px" }}>
              <button
                type="button"
                onClick={handleLoadMore}
                style={{
                  backgroundColor: "#f4c550",
                  border: "none",
                  borderRadius: "12px",
                  padding: "16px 48px",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#121417",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffdc86")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f4c550")}
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}