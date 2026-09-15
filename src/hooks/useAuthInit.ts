import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { restoreAuth } from "@/api/auth";

export function useAuthInit() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const initAuth = async () => {
      try {
        const response = await restoreAuth();
        if (response && isMounted) {
          useAuthStore.getState().setSession(response.user, response.accessToken);
        }
      } catch (error) {
        // Silently ignore restoration errors
      } finally {
        if (isMounted) {
          setIsInitialized(true);
        }
      }
    };

    // Set a timeout to force initialization even if restoration hangs
    const timeout = setTimeout(() => {
      if (isMounted && !isInitialized) {
        setIsInitialized(true);
      }
    }, 2000);

    initAuth();

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, []);

  return { isInitialized };
}
