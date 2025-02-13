import { Canvas, Rect, IText, Group } from "fabric";

const createSearchBar = (canvas: Canvas | null) => {
  if (!canvas) return; // Wait until canvas is initialized

  const rectangle = new Rect({
    width: 500,
    height: 40,
    fill: "#D3D3D3",
    originX: "center",
    originY: "center",
    rx: 10, // for rounded suggest 25
    ry: 10, // for rounded suggest 25
    evented: false,
    selectable: false,
  });

  // Generate a unique ID for the rectangle
  const rectId = crypto.randomUUID();
  rectangle.set("id", rectId);

  const text = new IText("What would you like to search ?", {
    fontSize: 18,
    fill: "#000000",
    originX: "center",
    originY: "center",
    selectable: false,
  });

  // Generate a unique ID for the rectangle
  const textId = crypto.randomUUID();
  text.set("id", textId);

  const newSearchBar = new Group([rectangle, text], {
    left: canvas.getWidth() / 2,
    top: canvas.getHeight() / 2,
    originX: "center",
    originY: "center",
    objectCaching: false, // look this up in github repo of fabric
  });

  // Combine the two IDs for the group.
  // Using '+' as the separator. Since crypto.randomUUID() never produces '+',
  // this combined ID will be unambiguous.
  const groupId = `${rectId}|${textId}`;
  newSearchBar.set("id", groupId);

  newSearchBar.on("mousedblclick", () => {
    text.set({ selectable: true });
    canvas.setActiveObject(text);
    text.enterEditing();
    text.once("editing:exited", () => text.set({ selectable: false }));
  });

  canvas.add(newSearchBar);
  canvas.renderAll();
};

export default createSearchBar;
