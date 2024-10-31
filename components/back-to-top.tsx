"use client";
import { ArrowUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        style={{ bottom: isVisible ? "20px" : "-32px" }}
        className="fixed right-5 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-muted shadow-sm transition-all hover:bg-primary hover:text-white dark:bg-slate-900"
      >
        <ArrowUpIcon width={18} height={18} />
      </button>
    </>
  );
};

export default BackToTop;
