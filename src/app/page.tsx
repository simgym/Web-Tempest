"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import FabricCanvas from "@/components/Fabric/FabricCanvas";

import PropertiesMenu from "@/components/PropertiesMenu";
import { useCanvas } from "@/contexts/CanvasContext";

export default function Home() {
  const { selected } = useCanvas();
  return (
    <>
      <div className="bg-[#E5E4E2] w-full text-white p-2 flex justify-center items-center">
        {/* h is set based on size of menu which is placeholder here */}
        {selected ? <PropertiesMenu /> : <div className="h-9" />}
      </div>
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={75}>
          <FabricCanvas />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25}>
          This panel is for displaying code
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
