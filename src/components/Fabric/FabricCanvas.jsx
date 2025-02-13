"use client";

import React from "react";
import { useCanvas } from "@/contexts/CanvasContext";

const FabricCanvas = () => {
  const { canvasRef, containerRef } = useCanvas(); // states from canvas context

  return (
    <>
      <div ref={containerRef} className="h-full w-full bg-white">
        <canvas id="canvas" ref={canvasRef} />
      </div>
    </>
  );
};

export default FabricCanvas;
