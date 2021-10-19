import { NodeRef, Unstable_NestingAuto as NestingAuto } from '@fluentui/react-component-nesting-registry';
import { mount } from 'enzyme';
import * as React from 'react';

describe('NestingAuto', () => {
  describe('children', () => {
    it('renders components based on present context', () => {
      const wrapper = mount(<NestingAuto>{() => <NestingAuto>{() => <div />}</NestingAuto>}</NestingAuto>);

      expect(wrapper.childAt(0).is('NestingRoot')).toBe(true);
      // <NestingAuto /> => <NestingRoot /> => <NestingAuto /> => <NestingChild />
      expect(wrapper.childAt(0).childAt(0).childAt(0).is('NestingChild')).toBe(true);
    });

    it('is a render function', () => {
      const children = jest.fn().mockImplementation((_, ref: NodeRef<HTMLDivElement>) => <div ref={ref} />);
      mount(<NestingAuto>{children}</NestingAuto>);
      const getRefs = children.mock.calls[0][0];

      expect(children).toBeCalledWith(
        expect.any(Function),
        expect.objectContaining({ current: expect.objectContaining({ tagName: 'DIV' }) }),
      );
      expect(getRefs()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            current: expect.objectContaining({ tagName: 'DIV' }),
          }),
        ]),
      );
    });
  });
});
