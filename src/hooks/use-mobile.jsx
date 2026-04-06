import * as React from "react";

const MOBILE_BREAKPOINT = 768;


export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Media query list for the specific breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Handler to update state based on the match
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Standard listener for modern browsers
    mql.addEventListener("change", onChange);
    
    // Run once on mount to set initial state
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Clean up listener to prevent memory leaks
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}