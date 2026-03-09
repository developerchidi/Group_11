import React from "react";

type CardProps = {
  title: string;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="border rounded-lg shadow p-4 bg-white">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      {children}
    </div>
  );
};

export default Card;