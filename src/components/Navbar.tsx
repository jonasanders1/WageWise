import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

interface NavbarProps {
  showLogout?: boolean;
}

const Navbar = ({ showLogout = true }: NavbarProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <nav className="w-full p-4 border-b bg-background">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-foreground">WageWise</h1>
          <img src={logo} alt="WageWise" className="w-8 h-8" />
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <a 
              href="https://www.jonasanders1.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Back to Portfolio
            </a>
          </Button>
          {user && showLogout && (
            <Button variant="destructive" onClick={handleLogout}>
              Log Out
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
