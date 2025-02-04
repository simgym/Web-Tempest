import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import FabricCanvas from "@/components/Fabric/FabricCanvas";

export default function Home() {
  return (
    <ResizablePanelGroup direction="vertical" className="border">
      <ResizablePanel defaultSize={75} className="border-4 border-indigo-500">
        <FabricCanvas />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25}>
        This panel is for displaying code
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
