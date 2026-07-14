import { useEffect } from "react";

export default function useOutSideClick(optionRef, cb) {
  const optionIds = ["optionDropDown"];
  useEffect(() => {
    const handleMouseDown = (event) => {
      const existId = optionIds.find((id) => event.target.id === id);
      if (
        optionRef.current &&
        !optionRef.current.contains(event.target) &&
        !existId
      ) {
        cb();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [optionRef, cb]);
}
