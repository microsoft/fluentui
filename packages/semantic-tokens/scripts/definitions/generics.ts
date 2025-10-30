export type GenericTypes = {
  [key: string]: GenericType;
};

export type GenericType = {
  type: 'color' | 'dimension' | 'weight' | 'string';
  variants: string[];
  states?: string[];
  emphasis?: string[];
  styles?: string[];
  exceptions?: GenericType[];
};

export const generics: GenericTypes = {
  corner: {
    type: 'dimension',
    variants: ['circular', 'square'],
  },
  background: {
    type: 'color',
    variants: ['neutral', 'brand', 'danger', 'warning', 'success', 'disabled'],
    emphasis: ['loud', 'soft', 'subtle'],
    states: ['rest', 'hover', 'pressed', 'selected', 'hover.selected', 'pressed.selected'],
    exceptions: [
      {
        // Neutral also has a heavy and transparent emphasis
        type: 'color',
        variants: ['neutral'],
        emphasis: ['heavy', 'transparent'],
        states: ['rest', 'hover', 'pressed', 'selected', 'hover.selected', 'pressed.selected'],
      },
    ],
  },
  stroke: {
    type: 'color',
    variants: ['neutral', 'brand', 'danger', 'warning', 'success', 'disabled'],
    emphasis: ['loud', 'subtle', 'onloud'],
    states: ['rest', 'hover', 'pressed', 'selected', 'hover.selected', 'pressed.selected'],
    exceptions: [
      {
        // Neutral also has a soft and transparent emphasis
        type: 'color',
        variants: ['neutral'],
        emphasis: ['soft', 'transparent'],
        states: ['rest', 'hover', 'pressed', 'selected', 'hover.selected', 'pressed.selected'],
      },
    ],
  },
  foreground: {
    type: 'color',
    variants: ['brand', 'danger', 'warning', 'success', 'disabled'],
    emphasis: ['primary', 'onloud'],
    states: ['rest', 'hover', 'pressed', 'selected', 'hover.selected', 'pressed.selected'],
    exceptions: [
      {
        // Neutral also has secondary and onNeutral emphasis, but no onLoud
        type: 'color',
        variants: ['neutral'],
        emphasis: ['primary', 'secondary', 'onneutral'],
        states: ['rest', 'hover', 'pressed', 'selected', 'hover.selected', 'pressed.selected'],
      },
    ],
  },
};
