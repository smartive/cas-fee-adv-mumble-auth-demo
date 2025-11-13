'use client';

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  
  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };
  
  return (
    <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Logout
    </button>
  );
}
