"use client";
import React from "react";
import StatTable from "../../components/statTable";
import ReferralTable from "../../components/ReferralTable";
import RecentOrder from "../../components/RecentOrder";
import { useUserStore } from "@/stores/AuthStore";
import type { AuthUser } from "@/stores/AuthStore"; // <-- Use AuthUser

const Page = () => {
  const { user, isAuthenticated } = useUserStore();

  // Use the imported AuthUser interface for type safety
  const typedUser: AuthUser | null | undefined = user;

  return (
    <div className="min-h-screen bg-[#F8F9FB] pt-26 md:pl-[280px] pl-5 flex flex-col pr-10 ">
      <div className="mb-4 font-semibold">
        Welcome,{" "}
        {typedUser?.displayName && typeof typedUser.displayName === "string"
          ? typedUser.displayName
          : typedUser?.firstName && typeof typedUser.firstName === "string"
          ? typedUser.firstName
          : "User"}
        !
      </div>
      {!isAuthenticated ? (
        <div className="text-red-600 font-bold">
          Please log in to view your dashboard.
        </div>
      ) : (
        <>
          <StatTable />
          <ReferralTable />
          <div className="hidden md:block">
            <RecentOrder />
          </div>
        </>
      )}
    </div>
  );
};
export default Page;
