export type PrimitiveTypes = {
  [key: string]: PrimitiveType;
};

export type PrimitiveType = {
  type: 'color' | 'dimension' | 'weight';
  states: string[];
  styles: string[];
};

export const colorPrimitives: PrimitiveTypes = {
  neutral: {
    states: ['rest', 'hover', 'pressed'],
    styles: ['1', '2', '3', '4', '5', '6'],
    type: 'color',
  },
};
