"use client";

// this is where i have initialised canvas from fabric

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";

import { Canvas, FabricObject } from "fabric";

import { useColorPicker } from "./ColorPickerContext";

interface CanvasContextType {
  canvas: Canvas | null;
  setCanvas: React.Dispatch<React.SetStateAction<Canvas | null>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  elements: FabricObject[];
  setElements: React.Dispatch<React.SetStateAction<FabricObject[]>>;
}

const CanvasContext = createContext<CanvasContextType | null>(null);

interface CanvasProviderProps {
  children: ReactNode;
}

interface CustomFabricObject extends FabricObject {
  id: string; // ensuring that each object will haev id property
}

export const CanvasProvider: React.FC<CanvasProviderProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [selected, setSelected] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [elements, setElements] = useState<FabricObject[]>([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleSelection = (event: any) => {
        setSelected(true); // for opening prop menu

        console.log("check for event type in handleSelection", event);

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

        const selectedElement = elements.find(
          (obj) => (obj as CustomFabricObject).id === selectedId
        );

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
        setElements,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }
  return context;
};
