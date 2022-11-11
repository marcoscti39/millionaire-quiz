import React from "react";

const LostGameMessage = ({ moneyAmount }: { moneyAmount: string }) => {
  return (
    <div className="flex justify-center">
      <p className="font-bold text-4xl">You earned: {moneyAmount}</p>
    </div>
  );
};

export default LostGameMessage;
