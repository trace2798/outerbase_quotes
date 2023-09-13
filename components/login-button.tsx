"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "./ui/button";

interface LoginButtonProps {}

const LoginButton: FC<LoginButtonProps> = ({}) => {
  const router = useRouter();
  return (
    <>
      <Button onClick={() => router.push("/sign-in")}>Login</Button>
    </>
  );
};

export default LoginButton;
