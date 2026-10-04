import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [curStatus, setCurStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("online", () => {
      setCurStatus(true);
    });
    window.addEventListener("offline", () => {
      setCurStatus(false);
    });
  }, [curStatus]);
  return curStatus;
};

export default useOnlineStatus;
