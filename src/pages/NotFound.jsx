

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white overflow-hidden p-6">

      <div className="absolute w-[600px] h-[600px] bg-emerald-500/10 blur-[140px] rounded-full animate-pulse" />

      {/* 🚀 Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative text-center space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-8xl sm:text-9xl font-black tracking-tighter bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent"
        >
          404
        </motion.h1>

        {/* 🧠 Message */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Page not found
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto text-sm">
            The route{" "}
            <code className="text-emerald-400 bg-emerald-400/10 px-1 rounded">
              {location.pathname}
            </code>{" "}
            doesn’t exist or may have been moved.
          </p>
        </div>

        {/* 🎯 Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          
          {/* Go Home */}
          <Button
            asChild
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 h-11 rounded-full transition-all shadow-lg hover:shadow-emerald-500/30"
          >
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>

          {/* Go Back */}
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-zinc-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;