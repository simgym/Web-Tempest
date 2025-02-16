"use client";

import { Component, Type, Upload } from "lucide-react";
import { useEffect } from "react";
import createButton from "./Fabric/NewButton";
import createSearchBar from "./Fabric/NewSearchBar";
import { useCanvas } from "@/contexts/CanvasContext";
import { createHeading } from "./Fabric/NewText";
import { createSubHeading } from "./Fabric/NewText";
import { createBodyText } from "./Fabric/NewText";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Menu items.
const items = [
  {
    title: "Import Media",
    url: "#",
    icon: Upload,
  },
];

export function AppSidebar() {
  const { setOpen } = useSidebar();

  const { canvas } = useCanvas();

  // Ensure sidebar is collapsed on initial page load
  useEffect(() => {
    setOpen(false);
    console.log(setOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addButtonHandler = () => {
    createButton(canvas);
  };

  const addSearchbarHandler = () => {
    createSearchBar(canvas);
  };

  const addHeadingHandler = () => {
    createHeading(canvas);
  };

  const addSubHeadingHandler = () => {
    createSubHeading(canvas);
  };

  const addBodyTextHandler = () => {
    createBodyText(canvas);
  };

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <SidebarContent>
        <SidebarGroup className="cursor-pointer">
          <SidebarGroupContent>
            {/* Collapsable Menu for Components */}
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild className="text-black">
                    <SidebarMenuButton asChild className="text-white">
                      <div>
                        <Component />
                        <span>Component</span>
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem onClick={addButtonHandler}>
                        Button
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem onClick={addSearchbarHandler}>
                        Search Bar
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>Navigation Menu</SidebarMenuSubItem>
                      <SidebarMenuSubItem>Card</SidebarMenuSubItem>
                      <SidebarMenuSubItem>Table</SidebarMenuSubItem>
                      <SidebarMenuSubItem>List</SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>

            {/* collapsable menu for texts*/}

            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild className="text-black">
                    <SidebarMenuButton asChild className="text-white">
                      <div>
                        <Type />
                        <span>Text</span>
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem onClick={addHeadingHandler}>
                        Heading
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem onClick={addSubHeadingHandler}>
                        Sub Heading
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem onClick={addBodyTextHandler}>
                        Body Text
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>

            {/* Non Collapsable Menus */}
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            {/* Conditionally Render CreateNewButton */}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
