import * as React from 'react';

import {
  isConformant,
  handlesAccessibility,
  htmlIsAccessibilityCompliant,
  getRenderedAttribute,
} from 'test/specs/commonTests';
import { mountWithProvider, mountWithProviderAndGetComponent } from 'test/utils';
import { toggleButtonBehavior } from '@fluentui/accessibility';

import { Button } from 'src/components/Button/Button';
import {
  validateBehavior,
  ComponentTestFacade,
  buttonBehaviorDefinition,
  toggleButtonBehaviorDefinition,
} from '@fluentui/a11y-testing';

describe('Button', () => {
  isConformant(Button, {
    testPath: __filename,
    constructorName: 'Button',
  });

  describe('accessibility', () => {
    describe('button', () => {
      handlesAccessibility(Button, {
        defaultRootRole: undefined,
      });
    });

    describe('div Button', () => {
      handlesAccessibility(Button, {
        requiredProps: { as: 'div' },
        defaultRootRole: 'button',
      });
    });

    describe('HTML accessibility rules validation', () => {
      describe('icon button must have textual representation for screen readers', () => {
        test('with title', async () =>
          await htmlIsAccessibilityCompliant(<Button icon="books" title="testing button" />));

        test('with aria-label attribute', async () =>
          await htmlIsAccessibilityCompliant(<Button icon="books" aria-label="testing button" />));

        test('with aria-labelledby attribute', async () =>
          await htmlIsAccessibilityCompliant(
            <div>
              <Button icon="books" aria-labelledby="tstBtn" />
              <span id="tstBtn">testing button</span>
            </div>,
          ));
      });

      describe('different buttons variants', () => {
        test('button', async () => await htmlIsAccessibilityCompliant(<Button>Simple test button</Button>));

        test('button with text and icon', async () =>
          await htmlIsAccessibilityCompliant(<Button icon="test" content="Simple test button" />));
      });
    });

    describe('ToggleButton behavior', () => {
      describe('role button', () => {
        test('is not defined, if compoenent is button', () => {
          const renderedComponent = mountWithProviderAndGetComponent(
            Button,
            <Button accessibility={toggleButtonBehavior} />,
          );
          expect(getRenderedAttribute(renderedComponent, 'role', '')).toBe(undefined);
        });

        test('is defined, if compoenent is not button', () => {
          const renderedComponent = mountWithProviderAndGetComponent(
            Button,
            <Button as="div" accessibility={toggleButtonBehavior} />,
          );
          expect(getRenderedAttribute(renderedComponent, 'role', '')).toBe('button');
        });
      });
    });
  });

  describe('circular', () => {
    const circularProp = 'circular';

    test('is not set by default', () => {
      const btnCircular = mountWithProviderAndGetComponent(Button, <Button />).prop(circularProp);
      expect(btnCircular).toBeUndefined();
    });

    test('can be set to true', () => {
      const btnCircular = mountWithProviderAndGetComponent(Button, <Button circular />).prop(circularProp);

      expect(btnCircular).toEqual(true);
    });
  });

  describe('onClick', () => {
    test('does not call onClick when the button is disabled', () => {
      const onClick = jest.fn();
      const button = mountWithProvider(<Button disabled onClick={onClick} />).find('Button');
      button.simulate('click');

      expect(onClick).not.toHaveBeenCalled();
    });

    test('is called with (e, props) on a click', () => {
      const onClick = jest.fn();
      const button = mountWithProviderAndGetComponent(Button, <Button onClick={onClick} />);

      button.simulate('click');

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({ onClick }),
      );
    });
  });

  describe('ButtonBehavior', () => {
    const testFacade = new ComponentTestFacade(Button, {});
    const errors = validateBehavior(buttonBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });

  describe('ButtonToggleBehavior', () => {
    const testFacade = new ComponentTestFacade(Button, { accessibility: toggleButtonBehavior });
    const errors = validateBehavior(toggleButtonBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });
});
