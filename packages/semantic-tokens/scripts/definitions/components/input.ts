import { GroupPart } from '../groups.types';

// Group button tokens
export const inputGroup: GroupPart = {
  components: ['input', 'search', 'textArea'],
  /**
   * Core properties for the input group
   * These cover singular overrides, or interfaces for complex CSS management
   */
  coreProperties: [
    'padding.horizontal',
    'foreground',
    'background',
    'strokewidth',
    'corner',
    'gap',
    'minheight',
    'fontfamily',
    'fontsize',
    'fontweight',
    'lineheight',
  ],
  states: ['', 'selected'],
  stateProperties: ['stroke'],
  exceptions: [
    {
      // Disabled state uses unified colors for foreground/background
      states: ['disabled'],
      stateProperties: ['foreground', 'background', 'stroke'],
    },
    {
      // Invalid state has its own stroke color
      states: ['invalid'],
      stateProperties: ['stroke'],
    },
  ],
  parts: {
    placeholder: {
      coreProperties: ['foreground'],
    },
    underline: {
      states: ['', 'selected'],
      stateProperties: ['stroke'],
      exceptions: [
        {
          // Underline stroke can deviate width from groupInput stroke
          states: ['selected'],
          stateProperties: ['strokewidth'],
        },
      ],
    },
    icon: {
      coreProperties: ['foreground', 'size'],
    },
  },
};
