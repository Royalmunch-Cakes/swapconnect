"use client";

import PersonalInfo from "@/components/PersonalInfo";
import React, { useEffect, useState } from "react";
import { useAuthToken } from "@/hooks/useAuthToken";

function Page() {
  const token = useAuthToken();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Only run in the browser
    const storedId = localStorage.getItem("userId");
    setUserId(storedId);
  }, []);

  if (!token || !userId) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <PersonalInfo userId={userId} />
    </div>
  );
}

export default Page;
