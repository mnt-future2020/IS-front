"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";

export function SyncUser() {
  const { user } = useUser();
  const storeUser = useMutation(api.users.storeUser);

  useEffect(() => {
    if (!user) return;

    const sync = async () => {
      try {
        await storeUser({
          name: user.fullName || "Anonymous",
          email: user.primaryEmailAddress?.emailAddress || "no-email@example.com",
          image: user.imageUrl,
          tokenIdentifier: user.id,
        });
      } catch (error) {
        console.error("Failed to sync user with Convex:", error);
      }
    };

    sync();
  }, [user, storeUser]);

  return null;
}
