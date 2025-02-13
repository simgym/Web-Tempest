"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ColorPickerContext = createContext<
  { color: string; setColor: (color: string) => void } | undefined
>(undefined);

export const ColorPickerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [color, setColor] = useState("#fff");

  useEffect(() => {
    console.log(color);
  }, [color]);

  return (
    <ColorPickerContext.Provider value={{ color, setColor }}>
      {children}
    </ColorPickerContext.Provider>
  );
};

export const useColorPicker = () => {
  const context = useContext(ColorPickerContext);
  if (!context) {
    throw new Error("useColorPicker must be used within a ColorPickerProvider");
  }
  return context;
};
