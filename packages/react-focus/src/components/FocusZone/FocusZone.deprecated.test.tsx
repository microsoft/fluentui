import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { setWarningCallback } from '@fluentui/utilities';
import { FocusZone } from './FocusZone';

describe('FocusZone', () => {
  beforeAll(() => {
    // Prevent warn deprecations from failing test
    setWarningCallback(() => {
      /* no-op */
    });
  });

  afterAll(() => {
    setWarningCallback();
  });

  it('renders FocusZone correctly with ariaDescribedby and ariaLabelledby', () => {
    const component = renderer.create(
      <FocusZone ariaDescribedBy="customDescribedBy" ariaLabelledBy="customLabelledBy" />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
