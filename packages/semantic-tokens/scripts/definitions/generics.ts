export type GenericTypes = {
  [key: string]: GenericType;
};

export type GenericType = {
  type: 'color' | 'dimension' | 'weight' | 'string' | 'percentage';
  variants: string[];
  states?: string[];
  emphasis?: string[];
  styles?: string[];
  exceptions?: GenericType[];
};

export const generics: GenericTypes = {
  lightness: {
    type: 'percentage',
    // For now, only hover and pressed variants (relative)
    variants: [''],
    states: ['hover', 'pressed'],
  },
  corner: {
    type: 'dimension',
    variants: ['circular', 'square'],
  },
  surface: {
    type: 'color',
    variants: ['neutral'],
    emphasis: ['default', 'subtle'],
    states: [''],
  },
  background: {
    type: 'color',
    variants: ['neutral', 'brand', 'danger', 'warning', 'success'],
    emphasis: ['loud', 'soft', 'subtle'],
    states: [''],
    exceptions: [
      {
        // Neutral also has a heavy and transparent emphasis
        type: 'color',
        variants: ['neutral'],
        emphasis: ['heavy', 'transparent'],
        states: [''],
      },
      {
        // Disabled only has a single generic state
        type: 'color',
        variants: ['disabled'],
        emphasis: [''],
        states: [''],
      },
    ],
  },
  stroke: {
    type: 'color',
    variants: ['neutral', 'brand', 'danger', 'warning', 'success'],
    emphasis: ['loud', 'subtle', 'onloud'],
    states: [''],
    exceptions: [
      {
        // Neutral also has a soft and transparent emphasis
        type: 'color',
        variants: ['neutral'],
        emphasis: ['soft', 'transparent'],
        states: [''],
      },
      {
        // Disabled only has a single generic state
        type: 'color',
        variants: ['disabled'],
        emphasis: [''],
        states: [''],
      },
    ],
  },
  foreground: {
    type: 'color',
    variants: ['brand', 'danger', 'warning', 'success'],
    emphasis: ['primary', 'onloud'],
    states: [''],
    exceptions: [
      {
        // Neutral also has secondary and onNeutral emphasis, but no onLoud
        type: 'color',
        variants: ['neutral'],
        emphasis: ['primary', 'secondary', 'onneutral'],
        states: [''],
      },
      {
        // Disabled only has a single generic state
        type: 'color',
        variants: ['disabled'],
        emphasis: [''],
        states: [''],
      },
    ],
  },
};
