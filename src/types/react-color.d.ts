declare module "react-color" {
  import { Component } from "react";

  export interface ColorResult {
    hex: string;
    rgb: { r: number; g: number; b: number; a: number };
  }

  export interface SketchPickerProps {
    color?: string | { r: number; g: number; b: number; a?: number };
    onChange: (color: ColorResult) => void;
  }

  export class SketchPicker extends Component<SketchPickerProps> {}
}
