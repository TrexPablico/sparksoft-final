"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Divider, Flex } from "@aws-amplify/ui-react";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { Hub } from "aws-amplify/utils";
import { FaBars } from "react-icons/fa"; // Importing the hamburger icon
import Image from "next/image"; // Import Image component

export default function NavBar({ isSignedIn }: { isSignedIn: boolean }) {
  const [authCheck, setAuthCheck] = useState(isSignedIn);
  const [time, setTime] = useState("");
  const [dropdown, setDropdown] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const hubListennerCancel = Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signedIn":
          setAuthCheck(true);
          router.push("/");
          break;
        case "signedOut":
          setAuthCheck(false);
          router.push("/");
          break;
      }
    });

    return () => hubListennerCancel();
  }, [router]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeOptions = {
        timeZone: "Asia/Manila",
        hour: "2-digit" as "2-digit",
        minute: "2-digit" as "2-digit",
        second: "2-digit" as "2-digit",
      };
      const dateOptions = {
        timeZone: "Asia/Manila",
        weekday: "long" as "long",
        year: "numeric" as "numeric",
        month: "long" as "long",
        day: "numeric" as "numeric",
      };
      const philippineTime = now.toLocaleTimeString("en-US", timeOptions);
      const philippineDate = now.toLocaleDateString("en-US", dateOptions);
      setTime(`${philippineDate} - ${philippineTime}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const signOutSignin = async () => {
    if (authCheck) {
      await signOut();
    } else {
      router.push("/signin");
    }
  };

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  const defaultRoutes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/events",
      label: "Events",
    },
    {
      href: "/add",
      label: "Add News",
      loggedIn: true,
    },
    {
      href: "/addEvents",
      label: "Add Events",
      loggedIn: true,
    },
  ];

  const routes = defaultRoutes.filter(
    (route) => route.loggedIn === authCheck || route.loggedIn === undefined
  );

  return (
    <>
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding={"1rem"}
      >
        <Flex as="nav" alignItems="center" gap="2rem" margin="0 2rem">
          <Link href="/">
            <Image src="/img/hc.png" alt="Logo" width={80} height={80} />
          </Link>
          <div className="hidden md:flex gap-7">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="hover:underline"
              >
                {route.label}
              </Link>
            ))}
          </div>
        </Flex>
        <Flex alignItems="center" gap="2rem">
          <div>{time}</div>
          <Button
            variation="primary"
            borderRadius="2rem"
            className="mr-3"
            onClick={signOutSignin}
          >
            {authCheck ? "Sign Out" : "Sign In"}
          </Button>
          <FaBars
            className="md:hidden ml-4 cursor-pointer"
            onClick={showDropdown}
          />
        </Flex>
      </Flex>
      <Divider size="small"></Divider>
      {dropdown && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center gap-2 mt-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="hover:underline"
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
