"use client";

import React from "react";
import { useRef, useState, useEffect } from "react";
import { Canvas, Rect } from "fabric";

const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 500,
      });
      console.log(canvasRef);
      initCanvas.renderAll();

      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  useEffect(() => {
    if (canvas) {
      // add rectangles
      for (let i = 0; i < 5; i++) {
        const properties = {
          top: Math.random() * 400,
          left: Math.random() * 400,
          width: Math.random() * 150,
          height: Math.random() * 150,
          angle: 90,
          fill: getRandomColor(),
          id: "RECT" + i,
        };

        const rect = new Rect(properties);

        setData((prev) => [...prev, properties]);

        canvas.add(rect);
      }

      // for change in coordinates
      canvas.on("object:moving", (e) => {
        const activeObject = e.target;
        console.log(activeObject.id);
        setData((prevData) =>
          prevData.map((rect) =>
            rect.id === activeObject.id
              ? { ...rect, top: activeObject.top, left: activeObject.left }
              : rect
          )
        );
      });

      // for change in size
      canvas.on("object:scaling", (e) => {
        const activeObject = e.target;
        console.log(
          "x : ",
          activeObject.scaleX,
          " , y : ",
          activeObject.scaleY
        );
        setData((prevData) =>
          prevData.map((rect) =>
            rect.id === activeObject.id
              ? {
                  ...rect,
                  width: activeObject.width * activeObject.scaleX,
                  height: activeObject.height * activeObject.scaleY,
                }
              : rect
          )
        );
      });

      // for changes in angle
      canvas.on("object:rotating", (e) => {
        const activeObject = e.target;
        console.log("New Angle:", activeObject.angle);

        setData((prevData) =>
          prevData.map((rect) =>
            rect.id === activeObject.id
              ? { ...rect, angle: activeObject.angle }
              : rect
          )
        );
      });
    }
  }, [canvas]);

  useEffect(() => {
    console.log(JSON.stringify(data, null, 2));
  }, [data]);

  return (
    <div className="bg-cyan-500 ">
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
};

export default FabricCanvas;
