import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { ModeToggle } from "@/components/mode-toggle";
import AddQuote from "./add-quote";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <>
      <div className="border-b">
        <div className="flex items-center h-16 px-4">
          <div className="">Quotes x Outerbase</div>

          <div className="flex items-center ml-auto space-x-4">
            <ModeToggle />
            <AddQuote />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
