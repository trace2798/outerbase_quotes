import { ModeToggle } from "@/components/mode-toggle";
import { UserButton, auth } from "@clerk/nextjs";
import { AddQuote } from "./add-quote";
import LoginButton from "./login-button";

const Navbar = () => {
  const { userId } = auth();
  return (
    <>
      <div className="border-b">
        <div className="flex items-center h-16 px-4">
          <div className="">Quotes x Outerbase</div>

          <div className="flex items-center ml-auto space-x-4">
            <ModeToggle />
            {userId ? (
              <>
                <AddQuote user_id={userId} />
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
