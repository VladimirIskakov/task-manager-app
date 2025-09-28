import { auth } from "@/app";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type UserCredential,
} from "firebase/auth";

export const authService = {
  login: async (email: string, password: string) => {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  },

  register: async (email: string, password: string, displayName?: string) => {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { ...userCredential.user, displayName: displayName || userCredential.user.displayName };
  },

  logout: async () => {
    await signOut(auth);
  },
};
