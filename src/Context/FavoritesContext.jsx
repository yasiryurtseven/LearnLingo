import { useEffect, useState } from "react";
import { ref, set, remove, onValue } from "firebase/database";
import toast from "react-hot-toast";
import { db } from "../firebase/config";
import { useAuth } from "./useAuth";
import { FavoritesContext } from "./useFavorites";

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favorites, setFavorites] = useState([]); 

  useEffect(() => {
    if (!user) {
      return;
    }

    const favoritesRef = ref(db, `users/${user.uid}/favorites`);
    const unsubscribe = onValue(favoritesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFavoriteIds(Object.keys(data));
        setFavorites(Object.values(data)); 
      } else {
        setFavoriteIds([]);
        setFavorites([]);
      }
    });

    return () => {
      unsubscribe();
      setFavoriteIds([]);
      setFavorites([]);
    };
  }, [user]);

  const toggleFavorite = async (teacher) => {
    if (!user) {
      toast.error("This feature is available only for authorized users!");
      return;
    }

    const teacherId = teacher.id || `${teacher.name}_${teacher.surname}`;
    const isFav = favoriteIds.includes(teacherId);
    const itemRef = ref(db, `users/${user.uid}/favorites/${teacherId}`);

    try {
      if (isFav) {
        await remove(itemRef);
        toast.success("Removed from favorites");
      } else {
        await set(itemRef, { ...teacher, id: teacherId });
        toast.success("Added to favorites");
      }
    } catch {
      toast.error("Failed to update favorites. Please try again.");
    }
  };

  const isFavorite = (teacherId) => favoriteIds.includes(teacherId);

  const value = {
    favorites, 
    favoriteIds,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}