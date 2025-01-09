// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const PwaInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the default installation prompt
      event.preventDefault();
      // Store the event for later use
      setDeferredPrompt(event);
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    // warn the user if the app is already installed

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);
  const handleInstallClick = (event) => {
    event.preventDefault();

    // Display confirmation alert to install from the user
    // if (
    //   window.confirm(
    //     "The app is still in development stage. Some devices might face flickering issues. Please use the website for better experience. Click OK to continue."
    //   )
    // ) {
    if (deferredPrompt) {
      // Show the installation prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the installation");
        } else {
          console.log("User dismissed the installation");
        }

        // Reset the deferredPrompt variable
        setDeferredPrompt(null);
      });
    }
    // }
  };

  return (
    <Button
      size="lg"
      className="bg-white hover:bg-gray-100 text-black border hover:text-gray-900 border-gray-200 rounded-full text-xl px-12 py-6 inline-flex items-center justify-center"
      variant={"outline"}
      style={{ display: deferredPrompt ? "flex" : "none" }}
      onClick={handleInstallClick}
    >
      Get App
      <ArrowRight className="ml-3 h-6 w-6" />
    </Button>
    
  );
};

export default PwaInstall;
