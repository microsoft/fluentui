const { getTheme } = require('@uifabric/styling');
const fs = require('fs');
const path = require('path');

const defaultTheme = getTheme(true);
const fonts = defaultTheme.fonts;

const lines = [];
for (const fontName in fonts) {
  const font = fonts[fontName];
  for (const propName in font) {
    const name = 'ms-font-' + fontName + '-' + propName;
    lines.push(`$${name}: "[theme:${name}, default: ${font[propName]}]";`);
  }
}

const srcRoot = './src/common';
const fontsOutputFilename = '_themeVariables.scss';
fs.writeFileSync(path.join(srcRoot, fontsOutputFilename), lines.join('\n'));

// load palette

const palette = defaultTheme.palette;
const colorLines = [];
for (const color in palette) {
  const name = 'ms-color-' + color;
  colorLines.push(`$${name}: "[theme:${color}, default: ${palette[color]}]";`);
}

const paletteOutputFilename = '_themeOverrides.scss';
fs.writeFileSync(path.join(srcRoot, paletteOutputFilename), colorLines.join('\n'));

// load semantic colors

const semanticColors = defaultTheme.semanticColors;
const semanticLines = [];
const deprecatedTag = ' /* @deprecated */';

for (const color in semanticColors) {
  const name = color + 'Color';
  if (semanticColors[color].indexOf(deprecatedTag) >= 0) {
    semanticLines.push(`$${name}: '[theme:${color}, default: ${semanticColors[color].replace(deprecatedTag, '')}]'; ${deprecatedTag}`);
  } else {
    semanticLines.push(`$${name}: '[theme:${color}, default: ${semanticColors[color]}]'; `);
  }
}

const semanticOutputFilename = '_semanticSlots.scss';
fs.writeFileSync(path.join(srcRoot, semanticOutputFilename), semanticLines.join('\n'));
