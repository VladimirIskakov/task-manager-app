// useAuth.ts
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app";
import { useAppDispatch } from "./redux";
import { loadingEnd, loadingStart, logout, setUser, type AppUser } from "@/entities/auth";

export function useAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadingStart());

    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const mappedUser: AppUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        };
        dispatch(setUser(mappedUser));
      } else {
        dispatch(logout());
      }
      dispatch(loadingEnd());
    });

    return () => unsub();
  }, [dispatch]);
}
