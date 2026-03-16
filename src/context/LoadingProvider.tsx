import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
  appReady: boolean;
  setAppReady: (state: boolean) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);
  const [appReady, setAppReady] = useState(false);

  const appReadyRef = useRef(appReady);
  useEffect(() => {
    appReadyRef.current = appReady;
  }, [appReady]);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
    appReady,
    setAppReady,
  };

  useEffect(() => {
    // Auto-progress loading
    let percent = 0;
    const interval = setInterval(() => {
      // Don't let the loader finish until the main app chunk has mounted.
      // This prevents prod deployments from hiding the loader while lazy chunks are still downloading.
      const cap = appReadyRef.current ? 100 : 90;
      percent = Math.min(percent + 2, cap);
      setLoading(percent);

      if (percent >= 100) {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} setIsLoading={setIsLoading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
