import { database } from "@/firebaseconfig";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  where,
  query,
} from "firebase/firestore";

export const getOrCreateChat = async (user1Id, user2Id) => {
  const chatRef = collection(database, "cozychats");

  const q = query(
    chatRef,
    where("user1Id", "in", [user1Id, user2Id]),
    where("user2Id", "in", [user1Id, user2Id])
  );

  const querySnapshot = await getDocs(q);
  let chatId;

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      chatId = doc.id;
    });
  } else {
    const chatDoc = await addDoc(chatRef, {
      user1Id,
      user2Id,
      lastMessage: "",
      timestamp: serverTimestamp(),
    });
    chatId = chatDoc.id;
  }

  return chatId;
};
