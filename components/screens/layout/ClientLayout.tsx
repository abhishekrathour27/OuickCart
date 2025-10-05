"use client";
import { useEffect, useState } from "react";
import NavbarHOC from "@/components/screens/navbar/NavbarHOC";
import FooterHOC from "@/components/screens/footer/FooterHOC";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  const pathname = usePathname(); // ✅ top level pe call
  const routePart = pathname.split("/")[1]; // 👉 "shop"

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <>
      {routePart !== "admin" && <NavbarHOC />}
      {children}
      {routePart !== "admin" && <FooterHOC />}
    </>
  );
}
