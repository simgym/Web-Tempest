import { Canvas, Rect, IText, Group } from "fabric";

// maintain a hashmap to store ids : properties
// imp link : https://github.com/fabricjs/fabric.js/issues/3117
// qsn 2 is somehting that i have to implement as well

const createButton = (canvas: Canvas | null) => {
  if (!canvas) return; // Wait until canvas is initialized

  // Create the rectangle
  const rectangle = new Rect({
    width: 100,
    height: 40,
    fill: "#000000",
    originX: "center",
    originY: "center",
    rx: 10, // for rounded suggest 25
    ry: 10, // for rounded suggest 25
    evented: false,
    selectable: false,
  });

  // Generate a unique ID for the rectangle
  // assign a custom property like `id` to your fabric objects.
  const rectId = crypto.randomUUID();
  rectangle.set("id", rectId);

  // Create the text element
  const text = new IText("Button", {
    fontSize: 20,
    fill: "#ffffff",
    originX: "center",
    originY: "center",
    selectable: false,
  });

  // Generate a unique ID for the text element
  const textId = crypto.randomUUID();
  text.set("id", textId);

  // Create a group containing the rectangle and text
  const newButton = new Group([rectangle, text], {
    fill: "#784383",
    left: canvas.getWidth() / 2,
    top: canvas.getHeight() / 2,
    originX: "center",
    originY: "center",
    objectCaching: false, // check fabric docs for more details on objectCaching
  });

  // Combine the two IDs for the group.
  // Using '+' as the separator. Since crypto.randomUUID() never produces '+',
  // this combined ID will be unambiguous.
  const groupId = `${rectId}|${textId}`;

  // Assign the combined group ID
  newButton.set("id", groupId);

  // Add a double-click event handler to enable text editing
  newButton.on("mousedblclick", () => {
    text.set({ selectable: true });
    canvas.setActiveObject(text);
    text.enterEditing();
    text.once("editing:exited", () => text.set({ selectable: false }));
  });

  // console.log("Before Button: ", JSON.stringify(canvas));

  canvas.add(newButton);
  canvas.renderAll();

  // console.log("After Button: ", JSON.stringify(canvas));
};

export default createButton;
