import { LogOut } from "lucide";
import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="fixed justify-between items-center">
      <Button>
        <LogOut />
      </Button>
    </nav>
  );
};

export default Navbar;
