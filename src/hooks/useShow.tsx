import { useEffect } from "react";
const useShow = () => {
    useEffect(() => {
      console.log("Hello, World!");
    }, []);
  };

export default useShow;