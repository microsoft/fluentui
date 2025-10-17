// Each group of components will have these properties at default
// These properties have NO states and NO variants
export const coreProperties = ['fontfamily'];

// Each variant of a component will have these properties at default
// States will be appended here, i.e. rest, hover, pressed, disabled
export const variantStateProperties = ['background', 'foreground'];

// Scales affect different properties than variants
// These properties will be appended to the scale, i.e. small, medium, large
export const scaleProperties = ['fontsize', 'lineheight', 'padding', 'gap', 'corner', 'size', 'strokewidth'];

// Properties are generic tokens
export type GenericTypes = {
  [key: string]: {
    type: 'color' | 'dimension' | 'weight' | 'string';
    variants: string[];
    states?: string[];
    styles?: string[];
  };
};

export const generics: GenericTypes = {
  'focus.stroke': {
    type: 'color',
    variants: ['outer', 'inner', 'onbrand.hover', 'onbrand'],
    states: [''],
    styles: [''],
  },
  'focus.strokewidth': {
    type: 'dimension',
    variants: ['outer', 'inner'],
    states: [''],
    styles: [''],
  },
  corner: {
    type: 'dimension',
    variants: ['circular', 'square'],
  },
};
