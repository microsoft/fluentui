import * as React from 'react';
import * as keyboardKey from 'keyboard-key';

import Accordion from 'src/components/Accordion/Accordion';
import { isConformant, handlesAccessibility } from 'test/specs/commonTests';
import { mountWithProvider, mountWithProviderAndGetComponent } from 'test/utils';
import { accordionTitleSlotClassNames } from 'src/components/Accordion/AccordionTitle';
import { ReactWrapper, CommonWrapper } from 'enzyme';

const panels = [
  {
    key: 'one',
    title: 'One',
    content: '2 3 4',
  },
  {
    key: 'two',
    title: 'Five',
    content: '6 7 8 9',
  },
  {
    key: 'three',
    title: "What's next?",
    content: '10',
  },
];

const getTitleButtonAtIndex = (wrapper: ReactWrapper, index: number): CommonWrapper => {
  return wrapper
    .find(`.${accordionTitleSlotClassNames.contentWrapper}`)
    .filterWhere(n => typeof n.type() === 'string')
    .at(index);
};

describe('Accordion', () => {
  isConformant(Accordion, { autoControlledProps: ['activeIndex'] });

  describe('activeIndex', () => {
    it('is -1 by default in an exclusive accordion', () => {
      const accordion = mountWithProviderAndGetComponent(Accordion, <Accordion panels={panels} exclusive />);
      expect(accordion.state('activeIndex')).toBe(-1);
    });

    it('is [-1] by default in an non-exclusive accordion', () => {
      const accordion = mountWithProviderAndGetComponent(Accordion, <Accordion panels={panels} />);
      expect(accordion.state('activeIndex')).toEqual(expect.arrayContaining([-1]));
    });

    it('is 0 by default in an exclusive expanded accordion', () => {
      const accordion = mountWithProviderAndGetComponent(Accordion, <Accordion panels={panels} exclusive expanded />);
      expect(accordion.state('activeIndex')).toBe(0);
    });

    it('is [0] by default in an non-exclusive expanded accordion', () => {
      const accordion = mountWithProviderAndGetComponent(Accordion, <Accordion panels={panels} expanded />);
      expect(accordion.state('activeIndex')).toEqual(expect.arrayContaining([0]));
    });

    it('is the value of prop defaultActiveIndex is passed', () => {
      const defaultActiveIndex = [1, 2];
      const accordion = mountWithProviderAndGetComponent(
        Accordion,
        <Accordion panels={panels} defaultActiveIndex={defaultActiveIndex} />,
      );
      expect(accordion.state('activeIndex')).toEqual(expect.arrayContaining(defaultActiveIndex));
    });

    it('contains the indexes clicked by the user if the panels were closed', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} />);
      const accordion = wrapper.find(Accordion);
      getTitleButtonAtIndex(wrapper, 0).simulate('click');
      getTitleButtonAtIndex(wrapper, 2).simulate('click');

      expect(accordion.state('activeIndex')).toEqual(expect.arrayContaining([0, 2]));
    });

    it('contains the only one index clicked by the user if exclusive prop is passed', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} exclusive />);
      const accordion = wrapper.find(Accordion);
      getTitleButtonAtIndex(wrapper, 0).simulate('click');
      expect(accordion.state('activeIndex')).toEqual(0);

      getTitleButtonAtIndex(wrapper, 2).simulate('click');
      expect(accordion.state('activeIndex')).toEqual(2);
    });

    it('has indexes removed when their panels are closed by the user', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} defaultActiveIndex={[0, 1, 2]} />);
      const accordion = wrapper.find(Accordion);
      getTitleButtonAtIndex(wrapper, 0).simulate('click');
      getTitleButtonAtIndex(wrapper, 2).simulate('click');

      expect(accordion.state('activeIndex')).toEqual(expect.arrayContaining([1]));
    });

    it('keeps the at least one panel open if expanded prop is passed', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} defaultActiveIndex={[0]} expanded />);
      const accordion = wrapper.find(Accordion);
      getTitleButtonAtIndex(wrapper, 0).simulate('click');

      expect(accordion.state('activeIndex')).toEqual(expect.arrayContaining([0]));
    });
  });

  describe('focusedIndex', () => {
    it('is set at title click', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} />);
      const accordion = wrapper.find(Accordion);
      getTitleButtonAtIndex(wrapper, 1).simulate('click');
      expect(accordion.state('focusedIndex')).toEqual(1);
    });

    it('is changed by arrow key navigation', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} />);
      const accordion = wrapper.find(Accordion);
      getTitleButtonAtIndex(wrapper, 1).simulate('click');
      getTitleButtonAtIndex(wrapper, 1).simulate('keydown', {
        keyCode: keyboardKey.ArrowUp,
        key: 'ArrowUp',
      });
      expect(accordion.state('focusedIndex')).toEqual(0);

      getTitleButtonAtIndex(wrapper, 0).simulate('keydown', {
        keyCode: keyboardKey.ArrowDown,
        key: 'ArrowDown',
      });
      expect(accordion.state('focusedIndex')).toEqual(1);
    });

    it('is changed by arrow key navigation in a circular way', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} />);
      const accordion = wrapper.find(Accordion);
      getTitleButtonAtIndex(wrapper, 0).simulate('click');
      getTitleButtonAtIndex(wrapper, 0).simulate('keydown', {
        keyCode: keyboardKey.ArrowUp,
        key: 'ArrowUp',
      });
      expect(accordion.state('focusedIndex')).toEqual(panels.length - 1);

      getTitleButtonAtIndex(wrapper, panels.length - 1).simulate('keydown', {
        keyCode: keyboardKey.ArrowDown,
        key: 'ArrowDown',
      });
      expect(accordion.state('focusedIndex')).toEqual(0);
    });

    it('is changed to `0` at Home keydown', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} />);
      const accordion = wrapper.find(Accordion);
      getTitleButtonAtIndex(wrapper, 2).simulate('click');
      getTitleButtonAtIndex(wrapper, 2).simulate('keydown', {
        keyCode: keyboardKey.Home,
        key: 'Home',
      });
      expect(accordion.state('focusedIndex')).toEqual(0);
    });

    it('is changed to last index at End keydown', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} />);
      const accordion = wrapper.find(Accordion);
      getTitleButtonAtIndex(wrapper, 0).simulate('click');
      getTitleButtonAtIndex(wrapper, 0).simulate('keydown', {
        keyCode: keyboardKey.End,
        key: 'End',
      });
      expect(accordion.state('focusedIndex')).toEqual(panels.length - 1);
    });

    it('focuses the button element when is changed via focus handler', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} />);
      const title = getTitleButtonAtIndex(wrapper, 1);
      title.simulate('click');
      title.simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' });
      expect(document.activeElement).toEqual(getTitleButtonAtIndex(wrapper, 0).getDOMNode());
    });
  });

  describe('panels', () => {
    it('when clicked call onClick and onTitleClick if provided by the user', () => {
      const onTitleClick = jest.fn();
      const panels = [
        {
          key: 'one',
          title: 'One',
          content: '2 3 4',
        },
      ];
      const wrapper = mountWithProvider(<Accordion panels={panels} onTitleClick={onTitleClick} />);
      getTitleButtonAtIndex(wrapper, 0).simulate('click');

      expect(onTitleClick).toBeCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    handlesAccessibility(Accordion, { defaultRootRole: 'presentation' });
  });
});
