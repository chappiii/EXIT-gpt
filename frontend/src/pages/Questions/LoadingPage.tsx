import React, { useEffect, useState } from "react";
import { Spin } from "antd";

const LoadingPage: React.FC = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 60000); // Increase the interval to 10 seconds

    setTimeout(() => {
      clearInterval(interval);
    }, 320000); // Increase the timeout to 2 minutes

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Spin size="large" />
      <p className="mt-4 text-gray-500">I hope to do all exam </p>
    </div>
  );
};

export default LoadingPage;
