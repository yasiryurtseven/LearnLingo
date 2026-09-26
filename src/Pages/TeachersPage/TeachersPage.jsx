import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { ref, get } from "firebase/database";
import TeacherCard from "../../components/TeacherCard/TeacherCard";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section style={{ maxWidth: "1184px", margin: "0 auto", padding: "32px 16px" }}>
      {loading ? (
        <p style={{ textAlign: "center" }}>Öğretmenler yükleniyor...</p>
      ) : (
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "32px", padding: 0 }}>
          {teachers.map((teacher, index) => (
            <TeacherCard key={teacher.id || index} teacher={teacher} />
          ))}
        </ul>
      )}
    </section>
  );
}