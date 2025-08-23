import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import GenreList from "./GenreList";
import { ALL_GENRES } from "../consts/showGenres";
import { doc, setDoc } from "firebase/firestore";
import { firebaseAuth, firebaseDB } from "../firebaseClient";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function GenreBottomSheet({ isVisible, onClose, email, password }) {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleGenre = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email.trim(), password);
      const uid = userCredential.user.uid;

      await setDoc(doc(firebaseDB, "users", uid), {
        email,
        genres: selectedGenres,
        createdAt: new Date()
      });

      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      animationIn={"slideInUp"}
    >
      <View style={styles.sheet}>
        <Text style={styles.title}>Choose Your Favorite Genres</Text>

        <GenreList
          genres={ALL_GENRES}
          selectedGenres={selectedGenres}
          onToggle={toggleGenre}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: { justifyContent: "flex-end", margin: 0 },
  sheet: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "700" },
});
