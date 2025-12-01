import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "../../shared/hooks/useTheme";
import SearchInput from "../ui/SearchInput";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import Avatar from "../ui/Avatar";


const Header = () => {
  const [search, setSearch] = useState("");
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  // const logoSrc = theme === "dark" ? darkLogo : lightLogo;

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-surface-light px-6 text-slate-700 dark:border-white/10 dark:bg-[#120322] dark:text-slate-100">
      {/* brand */}
     

      {/* center search */}
      <div className="flex flex-1 justify-center px-4">
        <div className="w-full max-w-md">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search for students, assignments"
          />
        </div>
      </div>

      {/* right controls */}
      <div className="flex items-center gap-3">
        <IconButton onClick={toggleTheme}>
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </IconButton>

        <IconButton>
          <Bell className="h-4 w-4" />
        </IconButton>

        <Button variant="secondary" pill onClick={() => navigate("/login")}>
          Logout
          <LogOut className="ml-2 h-4 w-4" />
        </Button>

        <Avatar initials="AR" />
      </div>
    </header>
  );
};

export default Header;
