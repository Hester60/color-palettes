import chroma from 'chroma-js';
import {getRandomHexColor} from "@/libs/utils/getRandomHexColor";
import {getColorDetails} from "@/libs/utils/getColorDetails";
import {Color} from "@/libs/types/Color";

export const generateColorPalette = (hex?: string, withShades = false) => {
    const baseHexColor = hex || getRandomHexColor();

    let palette = [];
    for (let i = 0; i < 4; i++) {
        palette.push(generateRandomColorFromBase(baseHexColor, withShades));
    }

    palette = [getColorDetails(baseHexColor, withShades), ...palette].sort((a, b) => a.hsl[0] - b.hsl[0]);

    return palette;
};

export const generateRandomColorFromBase = (baseHexColor: string, withShades = false): Color => {
    const baseColor = chroma(baseHexColor);

    const hueVariation = 60; // Variation de teinte
    const hue = (baseColor.hsl()[0] + Math.random() * hueVariation * 2 - hueVariation) % 360;

    const saturation = Math.random() * 0.2 + 0.1;

    const lightness = Math.random() * 0.4 + 0.3;

    const randomColor = chroma.hsl(hue, saturation, lightness);

    return getColorDetails(randomColor.hex(), withShades);
};