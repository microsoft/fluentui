import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { ColorSlider } from './ColorSlider';
import { MAX_COLOR_HUE, MAX_COLOR_ALPHA } from '../../../utilities/color/index';
import { setWarningCallback } from '../../../Utilities';

describe('ColorSlider', () => {
  let component: renderer.ReactTestRenderer | undefined;

  beforeAll(() => {
    // Prevent warn deprecations from failing test
    setWarningCallback(() => {
      /* no-op */
    });
  });

  afterAll(() => {
    setWarningCallback();
  });

  afterEach(() => {
    if (component) {
      component.unmount();
      component = undefined;
    }
  });

  it('renders hue slider correctly', () => {
    component = renderer.create(<ColorSlider value={30} minValue={0} maxValue={MAX_COLOR_HUE} ariaLabel="Hue" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders alpha slider correctly', () => {
    component = renderer.create(
      <ColorSlider
        isAlpha
        value={30}
        overlayColor="#ff0000"
        minValue={0}
        maxValue={MAX_COLOR_ALPHA}
        ariaLabel="Alpha"
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
