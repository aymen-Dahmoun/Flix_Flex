import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "../firebaseClient";
import { useAuth } from "../context/AuthProvider";

export default function useUserGenres() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["userGenres", user?.uid],
    queryFn: async () => {
      if (!user?.uid) return [];
      const ref = doc(firebaseDB, "users", user.uid);
      const snap = await getDoc(ref);
      return snap.exists() ? snap.data().genres ?? [] : [];
    },
    enabled: !!user?.uid,
  });
}
