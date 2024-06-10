import convert from 'color-convert';
import {getRandomHexColor} from "@/libs/utils/getRandomHexColor";
import {GetColorName} from 'hex-color-to-color-name';
import {Color} from "@/libs/types/Color";
import chroma from "chroma-js";

export const getColorDetails = (hex: string, withShades = false): Color => {
    let baseHexColor: string = hex || getRandomHexColor();
    baseHexColor = baseHexColor.replace('#', '');

    const hsl = convert.hex.hsl(baseHexColor);
    const rgb = convert.hex.rgb(baseHexColor);
    const colorName = GetColorName(baseHexColor) as string;

    const scale = chroma.scale([chroma(baseHexColor).brighten(3), chroma(baseHexColor), chroma(baseHexColor).darken(2)]);

    let shades: Color[] = [];

    // Shades number
    const numSteps = 25;

    if (withShades) {
        const hexShades = scale.colors(numSteps);
        shades = hexShades.map((s: string) => getColorDetails(s.toUpperCase()));
        shades = Array.from(new Set(shades));
    }

    return {
        hsl,
        rgb,
        hex: `#${baseHexColor}`,
        name: colorName,
        isDarkColor: hsl[2] < 50,
        shades,
    };
}