import * as React from 'react';

import { getChildMapping } from './getChildMapping';
import { getNextChildMapping } from './getNextChildMapping';

describe('getNextChildMapping', () => {
  it('keeps items in as they are if mappings are the same', () => {
    const previous = getChildMapping([<div key="a" />, <div key="b" />]);
    const next = getChildMapping([<div key="a" />, <div key="b" />]);

    expect(getNextChildMapping(previous, next)).toMatchInlineSnapshot(`
      Object {
        ".$a": Object {
          "appear": false,
          "element": <div />,
          "unmountOnExit": true,
          "visible": true,
        },
        ".$b": Object {
          "appear": false,
          "element": <div />,
          "unmountOnExit": true,
          "visible": true,
        },
      }
    `);
  });

  it('removes items from the mapping', () => {
    const previous = getChildMapping([<div key="a" />, <div key="b" />, <div key="c" />, <div key="d" />]);
    const next = getChildMapping([<div key="b" />, <div key="d" />]);

    expect(getNextChildMapping(previous, next)).toMatchInlineSnapshot(`
      Object {
        ".$a": Object {
          "appear": false,
          "element": <div />,
          "unmountOnExit": true,
          "visible": false,
        },
        ".$b": Object {
          "appear": false,
          "element": <div />,
          "unmountOnExit": true,
          "visible": true,
        },
        ".$c": Object {
          "appear": false,
          "element": <div />,
          "unmountOnExit": true,
          "visible": false,
        },
        ".$d": Object {
          "appear": false,
          "element": <div />,
          "unmountOnExit": true,
          "visible": true,
        },
      }
    `);
  });

  it('adds new items into mappings', () => {
    const previous = getChildMapping([<div key="b" />, <div key="d" />]);
    const next = getChildMapping([<div key="a" />, <div key="b" />, <div key="c" />, <div key="d" />]);

    expect(getNextChildMapping(previous, next)).toMatchInlineSnapshot(`
      Object {
        ".$a": Object {
          "appear": true,
          "element": <div />,
          "unmountOnExit": true,
          "visible": true,
        },
        ".$b": Object {
          "appear": false,
          "element": <div />,
          "unmountOnExit": true,
          "visible": true,
        },
        ".$c": Object {
          "appear": true,
          "element": <div />,
          "unmountOnExit": true,
          "visible": true,
        },
        ".$d": Object {
          "appear": false,
          "element": <div />,
          "unmountOnExit": true,
          "visible": true,
        },
      }
    `);
  });

  it('handles flipping items', () => {
    const mapping = getNextChildMapping(
      getChildMapping([<div key="a" />, <div key="b" />]),
      getChildMapping([<div key="a" />]),
    );

    expect(mapping).toMatchInlineSnapshot(`
      Object {
        ".$a": Object {
          "appear": false,
          "element": <div />,
          "unmountOnExit": true,
          "visible": true,
        },
        ".$b": Object {
          "appear": false,
          "element": <div />,
          "unmountOnExit": true,
          "visible": false,
        },
      }
    `);

    expect(getNextChildMapping(mapping, getChildMapping([<div key="a" />, <div key="b" />]))).toMatchInlineSnapshot(`
      Object {
        ".$a": Object {
          "appear": false,
          "element": <div />,
          "unmountOnExit": true,
          "visible": true,
        },
        ".$b": Object {
          "appear": false,
          "element": <div />,
          "unmountOnExit": true,
          "visible": true,
        },
      }
    `);
  });
});
