import { MenuTrigger, MenuProvider, type MenuContextValue } from '@fluentui/react-menu';
import { render } from '@testing-library/react';
import * as React from 'react';

import { OverflowItem } from './OverflowItem';

describe('OverflowItem', () => {
  describe('ref', () => {
    it('handles ref', () => {
      const ref = jest.fn();

      render(
        <OverflowItem id="test" ref={ref}>
          <div id="child" />
        </OverflowItem>,
      );
      expect(ref).toHaveBeenCalledTimes(1);
      expect(ref).toHaveBeenCalledWith(expect.objectContaining({ id: 'child', tagName: 'DIV' }));
    });

    it('handles ref propagation', () => {
      const itemRef = jest.fn();
      const childRef = jest.fn();

      render(
        <OverflowItem id="test" ref={itemRef}>
          <MenuTrigger>
            <div id="child" ref={childRef} />
          </MenuTrigger>
        </OverflowItem>,
      );

      expect(itemRef).toHaveBeenCalledTimes(1);
      expect(itemRef).toHaveBeenCalledWith(expect.objectContaining({ id: 'child', tagName: 'DIV' }));

      expect(childRef).toHaveBeenCalledTimes(1);
      expect(childRef).toHaveBeenCalledWith(expect.objectContaining({ id: 'child', tagName: 'DIV' }));
    });

    it('handles ref propagation in reverse order', () => {
      const itemRef = jest.fn();
      const childRef = jest.fn();
      const triggerRef = jest.fn();

      const menuContextValue: Partial<MenuContextValue> = {
        triggerRef: triggerRef as unknown as React.MutableRefObject<HTMLElement>,
      };

      render(
        <MenuProvider value={menuContextValue as MenuContextValue}>
          <MenuTrigger>
            <OverflowItem id="test" ref={itemRef}>
              <div id="child" ref={childRef} />
            </OverflowItem>
          </MenuTrigger>
        </MenuProvider>,
      );

      expect(itemRef).toHaveBeenCalledTimes(1);
      expect(itemRef).toHaveBeenCalledWith(expect.objectContaining({ id: 'child', tagName: 'DIV' }));

      expect(childRef).toHaveBeenCalledTimes(1);
      expect(childRef).toHaveBeenCalledWith(expect.objectContaining({ id: 'child', tagName: 'DIV' }));

      expect(triggerRef).toHaveBeenCalledTimes(1);
      expect(triggerRef).toHaveBeenCalledWith(expect.objectContaining({ id: 'child', tagName: 'DIV' }));
    });
  });
});
