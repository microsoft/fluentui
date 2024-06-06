import * as React from 'react';

import { getChildMapping } from './getChildMapping';
import { mergeChildMappings } from './mergeChildMappings';

describe('mergeChildMappings', () => {
  it('merges child mappings and keeps order', () => {
    const previous = getChildMapping([<div key="a" />, <div key="b" />, <div key="c" />, <div key="d" />]);
    const next = getChildMapping([<div key="b" />, <div key="d" />]);

    expect(mergeChildMappings(previous, next)).toMatchInlineSnapshot(`
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
        ".$c": Object {
          "appear": false,
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
});
