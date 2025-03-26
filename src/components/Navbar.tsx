import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { ArrowLeft } from "lucide-react";

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
      <div className="max-w-[1400px] px-4 mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-foreground">WageWise</h1>
          <img src={logo} alt="WageWise" className="w-8 h-8" />
        </div>
        <div className="flex gap-2">
          <Button 
            asChild 
            variant="outline"
            className="hidden sm:inline-flex"
          >
            <a 
              href="https://www.jonasanders1.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Back to Portfolio
            </a>
          </Button>
          {/* Mobile Portfolio Link */}
          <Button 
            asChild 
            variant="outline"
            size="icon"
            className="sm:hidden"
          >
            <a 
              href="https://www.jonasanders1.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Back to Portfolio"
            >
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Button>
          {user && showLogout && (
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="hidden sm:inline-flex"
            >
              Log Out
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
