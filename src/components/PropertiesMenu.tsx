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

  // filter those which has id props and add only those to groupEle
  const groupEle = elements
    .filter((ele) => "id" in ele)
    .map(({ type, id }) => ({ type, id: id as string }));

  return (
    <Menubar>
      <Select onValueChange={(value) => setSelectedId(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select an object" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Objects</SelectLabel>
            {groupEle.map((obj) => (
              <SelectItem value={obj.id} key={obj.id}>
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
