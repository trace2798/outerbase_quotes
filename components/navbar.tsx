import { UserButton, auth, redirectToSignIn } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { AddQuote } from "./add-quote";
import { Button } from "./ui/button";
import LoginButton from "./login-button";

const Navbar = () => {
  const { userId } = auth();
console.log(userId)
  return (
    <>
      <div className="border-b">
        <div className="flex items-center h-16 px-4">
          <div className="">Quotes x Outerbase</div>

          <div className="flex items-center ml-auto space-x-4">
            <ModeToggle />
            {userId ? (
              <>
                <AddQuote />
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
