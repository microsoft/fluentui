export const primitiveStyles = ['loud', 'tint', 'subtle', 'transparent'];
export const states = ['rest', 'hover', 'pressed'];

export type PrimitiveTypes = {
  [key: string]: {
    type: 'color' | 'dimension' | 'weight';
    states: string[];
    styles: string[];
  };
};

export const primitives: PrimitiveTypes = {
  brand: {
    styles: primitiveStyles,
    states: [...states, 'selected'],
    type: 'color',
  },
};
