"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function ThemeToggler() {
  const [theme, setTheme] = useState("system");

  // Effect to initialize theme from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      // Set initial theme based on saved value or system preference
      setTheme(savedTheme || (isSystemDark ? "dark" : "light"));
    }
  }, []);

  // Effect to apply theme changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;

      const applyTheme = (themeMode) => {
        root.classList.remove("light", "dark");

        if (themeMode === "system") {
          const isSystemDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          root.classList.add(isSystemDark ? "dark" : "light");
        } else {
          root.classList.add(themeMode);
        }

        localStorage.setItem("theme", themeMode);
      };

      applyTheme(theme);

      // Listen for system theme changes if using 'system' mode
      if (theme === "system") {
        const systemThemeListener = (e) => applyTheme("system");
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", systemThemeListener);

        return () =>
          mediaQuery.removeEventListener("change", systemThemeListener);
      }
    }
  }, [theme]);

  // Component to render appropriate icon
  function Icon({ theme }) {
    if (theme === "system") {
      const isSystemDark =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      return isSystemDark ? <MoonIcon /> : <SunIcon />;
    }
    return theme === "light" ? <SunIcon /> : <MoonIcon />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Icon theme={theme} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">
            <SunIcon className="mr-2" />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <MoonIcon className="mr-2" />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <DesktopIcon className="mr-2" />
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
