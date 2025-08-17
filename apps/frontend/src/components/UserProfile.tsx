"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase/init";
import Image from "next/image";

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="flex items-center gap-3">
      <Image
        src={user.photoURL || "/default-avatar.png"}
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <div className="font-bold">{user.displayName || "No Name"}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </div>
    </div>
  );
}
