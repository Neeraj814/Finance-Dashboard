import { NavLink as RouterNavLink } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const NavLink = forwardRef(({ className, activeClassName, to, children, ...props }, ref) => {
  return (
    <RouterNavLink
      ref={ref}
      to={to}
      className={({ isActive }) =>
        cn(
          "relative flex items-center w-full gap-3 transition-all duration-300 outline-none rounded-xl px-4 py-2.5",
          className,
          isActive && (activeClassName || "bg-indigo-50 text-indigo-700 font-bold shadow-sm shadow-indigo-100")
        )
      }
      {...props}
    >
      <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-indigo-600 opacity-0 [[aria-current=page]_&]:opacity-100 transition-opacity" />
      {children}
    </RouterNavLink>
  );
});

NavLink.displayName = "NavLink";
export { NavLink };