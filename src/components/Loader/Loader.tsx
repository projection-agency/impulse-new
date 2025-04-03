import { useEffect, useState } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      {/* Пульсуюче коло */}
      <div className="absolute w-64 h-64 bg-gray-200 rounded-full animate-ping"></div>

      {/* Відсотки */}
      <p className="text-gray-700 text-9xl font-medium z-10">{progress}%</p>
    </div>
  );
};

export default Loader;
