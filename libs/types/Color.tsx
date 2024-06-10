import {HSL} from "color-convert/conversions";
import {RGB} from "color-name";

export type Color = {
    hex: string;
    rgb: RGB;
    hsl: HSL;
    name: string;
    isDarkColor: boolean;
    shades: Color[];
}