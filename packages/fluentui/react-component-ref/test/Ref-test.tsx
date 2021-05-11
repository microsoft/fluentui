import { Ref, RefFindNode, RefForward } from '@fluentui/react-component-ref';
import { shallow } from 'enzyme';
import * as React from 'react';

import { CompositeClass, ForwardedRef } from './fixtures';

describe('Ref', () => {
  describe('children', () => {
    it('renders single child', () => {
      const child = <div data-child="whatever" />;
      const innerRef = React.createRef<HTMLDivElement>();
      const component = shallow(<Ref innerRef={innerRef}>{child}</Ref>);

      expect(component.contains(child)).toBeTruthy();
    });

    it('renders RefFindNode when a component is passed', () => {
      const innerRef = React.createRef<HTMLDivElement>();
      const wrapper = shallow(
        <Ref innerRef={innerRef}>
          <CompositeClass />
        </Ref>,
      );

      expect(wrapper.is(RefFindNode)).toBe(true);
    });

    it('renders RefForward when a component wrapper with forwardRef() is passed', () => {
      const innerRef = React.createRef<HTMLDivElement>();
      const wrapper = shallow(
        <Ref innerRef={innerRef}>
          <ForwardedRef />
        </Ref>,
      );

      expect(wrapper.is(RefForward)).toBe(true);
    });
  });
});
