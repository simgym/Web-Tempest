import { IText, Canvas } from "fabric";

// FOR CREATING HEADING
export const createHeading = (canvas: Canvas | null) => {
  if (!canvas) return; // Wait until canvas is initialized

  const text = new IText("What would you like to search ?", {
    fontSize: 36,
    fill: "#000000",
    originX: "center",
    originY: "center",
    left: canvas.getWidth() / 2,
    top: canvas.getHeight() / 2,
  });

  text.set("id", crypto.randomUUID());

  text.on("mousedblclick", () => {
    text.set({ selectable: true });
    canvas.setActiveObject(text);
    text.enterEditing();
    // text.once("editing:exited", () => text.set({ selectable: false }));
  });

  // console.log("Before BUtton : ", JSON.stringify(canvas));

  canvas.add(text);
  canvas.renderAll();
  // console.log("After BUtton : ", JSON.stringify(canvas));
};

// FOR CREATING SUB HEADING

export const createSubHeading = (canvas: Canvas | null) => {
  if (!canvas) return; // Wait until canvas is initialized

  const text = new IText("What would you like to search ?", {
    fontSize: 24,
    fill: "#000000",
    originX: "center",
    originY: "center",
    left: canvas.getWidth() / 2,
    top: canvas.getHeight() / 2,
  });

  text.set("id", crypto.randomUUID());

  text.on("mousedblclick", () => {
    text.set({ selectable: true });
    canvas.setActiveObject(text);
    text.enterEditing();
    // text.once("editing:exited", () => text.set({ selectable: false }));
  });

  // console.log("Before BUtton : ", JSON.stringify(canvas));

  canvas.add(text);
  canvas.renderAll();
  // console.log("After BUtton : ", JSON.stringify(canvas));
};

// FOR CREATING BODY TEXT

export const createBodyText = (canvas: Canvas | null) => {
  if (!canvas) return; // Wait until canvas is initialized

  const text = new IText("What would you like to search ?", {
    fontSize: 18,
    fill: "#000000",
    originX: "center",
    originY: "center",
    left: canvas.getWidth() / 2,
    top: canvas.getHeight() / 2,
  });

  text.set("id", crypto.randomUUID());

  text.on("mousedblclick", () => {
    text.set({ selectable: true });
    canvas.setActiveObject(text);
    text.enterEditing();
    // text.once("editing:exited", () => text.set({ selectable: false }));
  });

  // console.log("Before BUtton : ", JSON.stringify(canvas));

  canvas.add(text);
  canvas.renderAll();
  // console.log("After BUtton : ", JSON.stringify(canvas));
};
