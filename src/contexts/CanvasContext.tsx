"use client";

// this is where i have initialised canvas from fabric

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

import { Canvas } from "fabric";

import { useColorPicker } from "./ColorPickerContext";

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selected, setSelected] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [elements, setElements] = useState([]);

  const { color } = useColorPicker();

  useEffect(() => {
    if (canvasRef.current && containerRef.current && !canvas) {
      const { clientWidth, clientHeight } = containerRef.current;

      // ensuring canvas element is ready
      if (!canvasRef.current) return;

      const initCanvas = new Canvas(canvasRef.current, {
        width: clientWidth,
        height: clientHeight,
      });

      setCanvas(initCanvas); // store canvas instance in context

      return () => {
        initCanvas.dispose(); // cleanup on unmount
      };
    }
  }, []);

  useEffect(() => {
    if (canvas && containerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        const { clientWidth, clientHeight } = containerRef.current;
        canvas.setDimensions({ width: clientWidth, height: clientHeight });
        canvas.renderAll();
      });

      resizeObserver.observe(containerRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [canvas]);

  // for object selection

  useEffect(() => {
    console.log("selected obj id is : ", selectedId);

    if (canvas) {
      const handleSelection = (event) => {
        setSelected(true); // for opening prop menu

        if (event.selected.length > 0) {
          const selectedObject = event.selected[0]; //  get selected object

          console.log("Selected object type:", selectedObject.type);

          if (selectedObject.id) {
            if (selectedObject.type === "group") {
              setElements(selectedObject.getObjects()); // get grouped elements
            } else {
              setElements([selectedObject]); // for single objects like IText
            }
          } else {
            console.warn("Selected object has no ID:", selectedObject);
          }
        }
      };

      // for selecting elemnts for a group or single elemnts to change their properties
      if (selectedId) {
        console.log("selected element id is : ", selectedId);

        console.log("getObjects will provide : ", canvas.getObjects());

        const selectedElement = elements.find((obj) => obj.id === selectedId);

        if (selectedElement) {
          console.log("Applying color to object:", selectedElement);
          if (color) {
            selectedElement.set("fill", color);
          }
        }
      }

      canvas.on("selection:created", handleSelection);
      canvas.on("selection:updated", handleSelection);

      // when selection is ended

      canvas.on("selection:cleared", () => {
        console.log("Selection cleared");
        setSelected(false);
      });
      canvas.renderAll();
    }
  }, [canvas, selectedId, color]);

  return (
    <CanvasContext.Provider
      value={{
        canvas,
        setCanvas,
        canvasRef,
        containerRef,
        selected,
        setSelected,
        selectedId,
        setSelectedId,
        elements,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
