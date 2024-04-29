import * as React from 'react';

import { Tooltip } from 'src/components/Tooltip/Tooltip';
import { tooltipContentClassName } from 'src/components/Tooltip/TooltipContent';
import { Button, buttonClassName } from 'src/components/Button/Button';

import { mountWithProvider, findIntrinsicElement } from '../../../utils';
import { implementsPopperProps } from 'test/specs/commonTests/implementsPopperProps';

describe('Tooltip', () => {
  implementsPopperProps(Tooltip, {
    requiredProps: { open: true },
  });

  test('aria-labelledby is not added on trigger if aria-label is passed to trigger shorthand', () => {
    const ariaLabelTestValue = 'test-aria-label';
    const wrapper = mountWithProvider(<Tooltip defaultOpen trigger={<Button aria-label={ariaLabelTestValue} />} />);
    const trigger = findIntrinsicElement(wrapper, `.${buttonClassName}`);

    expect(trigger.getDOMNode()).toHaveAttribute('aria-label', ariaLabelTestValue);
    expect(trigger.getDOMNode()).not.toHaveAttribute('aria-labelledby');
  });

  describe('content', () => {
    it('uses "id" if "content" with "id" is passed', () => {
      const contentId = 'element-id';

      const wrapper = mountWithProvider(<Tooltip defaultOpen trigger={<Button />} content={{ id: contentId }} />);
      const content = findIntrinsicElement(wrapper, `.${tooltipContentClassName}`);

      expect(content.prop('id')).toBe(contentId);
    });

    it('uses computed "id" if "content" is passed without "id"', () => {
      const wrapper = mountWithProvider(<Tooltip defaultOpen trigger={<Button />} content="Welcome" />);
      const content = findIntrinsicElement(wrapper, `.${tooltipContentClassName}`);

      expect(content.prop('id')).toMatch(/tooltip-content-\d+/);
    });
  });

  describe('onOpenChange', () => {
    test('is called on hover', () => {
      const onOpenChange = jest.fn();

      mountWithProvider(<Tooltip trigger={<Button />} content="Hi" onOpenChange={onOpenChange} />)
        .find('button')
        .simulate('mouseEnter');

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'mouseenter' }),
        expect.objectContaining({ open: true }),
      );
    });

    // https://github.com/microsoft/fluent-ui-react/pull/619
    test('is called on hover when controlled', () => {
      const onOpenChange = jest.fn();

      mountWithProvider(<Tooltip open={false} trigger={<Button />} content="Hi" onOpenChange={onOpenChange} />)
        .find('button')
        .simulate('mouseEnter');

      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'mouseenter' }),
        expect.objectContaining({ open: true }),
      );
    });
  });

  test('it should call trigger events', () => {
    const onKeyDown = jest.fn();

    mountWithProvider(<Tooltip open={false} trigger={<Button onKeyDown={onKeyDown} />} content="Hi" />)
      .find('button')
      .simulate('keydown', { keyCode: 13 });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ type: 'keydown' }));
  });
});

describe('open', () => {
  it('is passed to "Popper" as "enabled"', () => {
    const wrapper = mountWithProvider(<Tooltip trigger={<button />} content="Foo" />);
    expect(wrapper.find('Popper').prop('enabled')).toBe(false);

    wrapper.setProps({ open: true });
    expect(wrapper.find('Popper').prop('enabled')).toBe(true);
  });
});
