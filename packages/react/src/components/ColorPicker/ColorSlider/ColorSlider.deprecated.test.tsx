import * as React from 'react';
import { render } from '@testing-library/react';

import { ColorSlider } from './ColorSlider';
import { MAX_COLOR_HUE, MAX_COLOR_ALPHA } from '../../../utilities/color/index';
import { setWarningCallback } from '../../../Utilities';

describe('ColorSlider', () => {
  let component: ReturnType<typeof render> | undefined;

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
    component = render(<ColorSlider value={30} minValue={0} maxValue={MAX_COLOR_HUE} ariaLabel="Hue" />);
    expect(component.container.firstChild).toMatchSnapshot();
  });

  it('renders alpha slider correctly', () => {
    component = render(
      <ColorSlider
        isAlpha
        value={30}
        overlayColor="#ff0000"
        minValue={0}
        maxValue={MAX_COLOR_ALPHA}
        ariaLabel="Alpha"
      />,
    );
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
