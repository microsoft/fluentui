import { expandShorthand } from './expandShorthand';

describe('expandShorthand', () => {
  it('should expand a mix of shorthands and longhands based on order', () => {
    expect(expandShorthand({ marginLeft: '10px', margin: '5px' })).toMatchInlineSnapshot(`
      Object {
        "marginBottom": "5px",
        "marginLeft": "5px",
        "marginRight": "5px",
        "marginTop": "5px",
      }
    `);
    expect(expandShorthand({ margin: '5px', marginLeft: '10px' })).toMatchInlineSnapshot(`
      Object {
        "marginBottom": "5px",
        "marginLeft": "10px",
        "marginRight": "5px",
        "marginTop": "5px",
      }
    `);
    expect(expandShorthand({ marginRight: '10px', margin: '5px', marginLeft: '10px' })).toMatchInlineSnapshot(`
      Object {
        "marginBottom": "5px",
        "marginLeft": "10px",
        "marginRight": "5px",
        "marginTop": "5px",
      }
    `);
  });

  it('"undefined" is ignored', () => {
    expect(expandShorthand({ margin: '5px', marginLeft: undefined })).toMatchInlineSnapshot(`
      Object {
        "marginBottom": "5px",
        "marginLeft": "5px",
        "marginRight": "5px",
        "marginTop": "5px",
      }
    `);
  });

  it('should expand nested objects', () => {
    expect(expandShorthand({ ':hover': { padding: '10px' } })).toMatchInlineSnapshot(`
      Object {
        ":hover": Object {
          "paddingBottom": "10px",
          "paddingLeft": "10px",
          "paddingRight": "10px",
          "paddingTop": "10px",
        },
      }
    `);
  });
});
