import * as React from 'react';
import { expectPresenceMotionFunction, expectPresenceMotionArray } from '../../testing/testUtils';
import { Collapse } from './Collapse';

describe('Collapse', () => {
  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Collapse);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionArray(Collapse);
  });

  it('accepts fromSize and toSize and rejects removed outSize', () => {
    const children = React.createElement('div');
    React.createElement(Collapse, { fromSize: '10px', toSize: '24px', children });
    React.createElement(Collapse.In, { fromSize: '10px', children });
    React.createElement(Collapse.Out, { toSize: '24px', children });
    // @ts-expect-error fromSize/toSize replace outSize
    React.createElement(Collapse, { outSize: '10px', children });
  });
});
