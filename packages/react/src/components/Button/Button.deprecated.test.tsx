import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { CompoundButton } from './CompoundButton/CompoundButton';
import { resetIds, setWarningCallback } from '@fluentui/utilities';
import { render } from '@testing-library/react';

describe('Button', () => {
  beforeAll(() => {
    // Prevent warn deprecations from failing test
    setWarningCallback(() => {
      /* no-op */
    });
  });

  afterAll(() => {
    setWarningCallback();
  });

  beforeEach(() => {
    resetIds();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders CompoundButton correctly', () => {
    const component = renderer.create(
      <CompoundButton description="You can create a new account here.">Create account</CompoundButton>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('DefaultButton', () => {
    it('applies the correct aria attributes', () => {
      const { container } = render(
        <CompoundButton description="Some awesome description" ariaDescription="Description on icon button">
          And this is the label
        </CompoundButton>,
      );

      expect(container.getAttribute('aria-label') === null);
      expect(container.getAttribute('aria-labelledby') === container.querySelector('.ms-Button-label')!.id);
      expect(container.getAttribute('aria-describedby') === container.querySelector('.ms-Button-description')!.id);
    });
  });
});
