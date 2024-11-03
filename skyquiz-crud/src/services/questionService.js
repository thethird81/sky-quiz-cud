import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const questionCollectionRef = collection(db, "questions");

const addQuestion = async (newQuestion) => {
  try {
    await addDoc(questionCollectionRef, newQuestion);
    return { success: true, message: "Question added successfully!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const getQuestions = async () => {
  try {
    const data = await getDocs(questionCollectionRef);
    return { success: true, data: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) };
  } catch (error) {
    return { success: false, data: [], message: error.message };
  }
};

const updateQuestion = async (id, updatedQuestion) => {
  try {
    const questionDoc = doc(db, "questions", id);
    await updateDoc(questionDoc, updatedQuestion);
    return { success: true, message: "Question updated successfully!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const deleteQuestion = async (id) => {
  try {
    const questionDoc = doc(db, "questions", id);
    await deleteDoc(questionDoc);
    return { success: true, message: "Question deleted successfully!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export { addQuestion, getQuestions, updateQuestion, deleteQuestion };
