import React, { useEffect } from "react";

export const ClientComponent = () => {
  const handleClick = () => {
    console.log("클릭!");
  };

  useEffect(() => {
    console.log("@@ 하이드레이션");
  }, []);

  return (
    <button type="button" onClick={handleClick}>
      하이드레이션 테스트
    </button>
  );
};
