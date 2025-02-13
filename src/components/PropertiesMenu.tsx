"use client";

import React from "react";

import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ColorPicker from "./ColorPicker";
import { useCanvas } from "@/contexts/CanvasContext";

const PropertiesMenu = () => {
  const { setSelectedId, elements } = useCanvas();

  const groupEle = [];

  let n = elements.length;

  for (let i = 0; i < n; i++) {
    let type = elements[i].type;
    let id = elements[i].id;
    groupEle.push({ type, id });
  }

  return (
    <Menubar>
      <Select onValueChange={(value) => setSelectedId(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select an object" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Objects</SelectLabel>
            {groupEle.map((obj, index) => (
              <SelectItem value={obj.id} key={index}>
                {obj.type}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* for color selection */}
      <MenubarMenu>
        <MenubarTrigger>
          <ColorPicker />
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};

export default PropertiesMenu;
