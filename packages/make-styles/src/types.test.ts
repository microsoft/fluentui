import { MakeStylesStyle } from './types';

function assertType(style: MakeStylesStyle): MakeStylesStyle {
  return style;
}

describe('types tests', () => {
  it('passing fixtures', () => {
    // Basic styles
    //

    assertType({ flexShrink: 0 });
    assertType({ flexShrink: 1 });

    assertType({ color: 'beige' });
    assertType({ paddingLeft: '5px' });

    assertType({ '--color': 'red' });

    // Strict selector defined via "CSS.Pseudos"
    //

    assertType({
      ':hover': { flexShrink: 0 },
      ':focus': { flexShrink: 'initial' },
    });

    assertType({
      ':hover': { color: 'beige' },
      ':focus': { paddingLeft: '5px' },
    });

    assertType({
      ':hover': { '--color': 'red' },
    });

    // Custom selectors
    //

    assertType({
      ':hover:focus': { flexShrink: 0 as const },
      ':hover:active': { flexShrink: 'initial' },
    });

    assertType({
      '.bar': { color: 'beige' },
      '.foo': { paddingLeft: '5px' },
    });

    assertType({
      '.bar': { '--color': 'red' },
    });

    // Nested custom selectors
    //

    assertType({
      '.foo': {
        '.bar': { flexShrink: 0 as const },
        '.baz': { flexShrink: 'initial' },
      },
      '.bar': {
        '.baz': { color: 'beige' },
        '.qux': { paddingLeft: '5px' },
      },
      '.baz': {
        '.qux': {
          '--color': 'red',
        },
      },
    });
  });

  it('fixtures that should fail', () => {
    // Banned shorthand properties
    //

    // @ts-expect-error "padding" is banned
    assertType({ padding: 0 });
    // @ts-expect-error "borderLeft" is banned
    assertType({ borderLeft: '5px' });

    // Invalid values
    //

    // @ts-expect-error "1" is invalid value for "flexShrink"
    assertType({ flexShrink: '1' });
    // @ts-expect-error "paddingLeft" cannot be numeric value
    assertType({ paddingLeft: 5 });
    // @ts-expect-error "0" is invalid value for "color"
    assertType({ color: 0 });

    // Strict selectors
    //

    assertType({
      ':hover': {
        // @ts-expect-error "1" is invalid value for "flexShrink"
        flexShrink: '1',
        // @ts-expect-error "padding" is banned
        padding: 0,
        // @ts-expect-error "paddingLeft" cannot be numeric value
        paddingLeft: 5,
      },
    });

    // Custom selectors
    //

    assertType({
      ':hover:focus': {
        // @ts-expect-error "1" is invalid value for "flexShrink"
        flexShrink: '1',
        // @ts-expect-error "padding" is banned
        padding: 0,
        // @ts-expect-error "paddingLeft" cannot be numeric value
        paddingLeft: 5,
      },
    });

    // Nested custom selectors
    //

    assertType({
      '.foo': {
        '.baz': {
          // @ts-expect-error "1" is invalid value for "flexShrink"
          flexShrink: '1',
          // @ts-expect-error "padding" is banned
          padding: 0,
          // @ts-expect-error "paddingLeft" cannot be numeric value
          paddingLeft: 5,
        },
      },
    });
  });
});
