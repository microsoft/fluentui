import * as React from 'react';
import { keyboardKey } from '@fluentui/accessibility';

import { Accordion } from 'src/components/Accordion/Accordion';
import { handlesAccessibility, htmlIsAccessibilityCompliant, isConformant } from 'test/specs/commonTests';
import {
  mountWithProvider,
  mountWithProviderAndGetComponent,
  findIntrinsicElement,
  createTestContainer,
} from 'test/utils';
import { accordionTitleSlotClassNames } from 'src/components/Accordion/AccordionTitle';
import { accordionContentClassName } from 'src/components/Accordion/AccordionContent';
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

const getContentPanels = (wrapper: ReactWrapper): CommonWrapper => {
  return findIntrinsicElement(wrapper, `.${accordionContentClassName}`);
};

const getExclusiveItemWithPropIndex = (accordion, prop) =>
  accordion.find('AccordionTitle').filterWhere(accordionTitle => accordionTitle.prop(prop));

const getNonExclusiveItemWithPropIndex = (accordion, prop) =>
  accordion
    .find('AccordionTitle')
    .filterWhere(accordionTitle => accordionTitle.prop(prop))
    .prop('index');

const getNonExclusiveItemWithPropArray = (accordion, prop) =>
  accordion
    .find('AccordionTitle')
    .filterWhere(accordionTitle => accordionTitle.prop(prop))
    .map(node => node.prop('index'));

const getAccordionTitleAtIndex = (accordion, index) =>
  findIntrinsicElement(accordion, `.${accordionTitleSlotClassNames.contentWrapper}`).at(index).getDOMNode();

describe('Accordion', () => {
  isConformant(Accordion, {
    testPath: __filename,
    constructorName: 'Accordion',
    autoControlledProps: ['activeIndex'],
  });

  describe('activeIndex', () => {
    it('has no active item by default when exclusive', () => {
      const accordion = mountWithProviderAndGetComponent(Accordion, <Accordion panels={panels} exclusive />);
      expect(getExclusiveItemWithPropIndex(accordion, 'active')).toHaveLength(0);
    });

    it('is no active item by default in an non-exclusive accordion', () => {
      const accordion = mountWithProviderAndGetComponent(Accordion, <Accordion panels={panels} />);
      expect(getExclusiveItemWithPropIndex(accordion, 'active')).toHaveLength(0);
    });

    it('is has the first element active by default in an exclusive expanded accordion', () => {
      const accordion = mountWithProviderAndGetComponent(Accordion, <Accordion panels={panels} exclusive expanded />);
      expect(getNonExclusiveItemWithPropIndex(accordion, 'active')).toBe(0);
    });

    it('is has only the first element active by default in an non-exclusive expanded accordion', () => {
      const accordion = mountWithProviderAndGetComponent(Accordion, <Accordion panels={panels} expanded />);
      expect(getNonExclusiveItemWithPropIndex(accordion, 'active')).toBe(0);
    });

    it('is has the active elements corresponding to the prop defaultActiveIndex passed', () => {
      const defaultActiveIndex = [1, 2];
      const accordion = mountWithProviderAndGetComponent(
        Accordion,
        <Accordion panels={panels} defaultActiveIndex={defaultActiveIndex} />,
      );
      expect(getNonExclusiveItemWithPropArray(accordion, 'active')).toEqual(expect.arrayContaining(defaultActiveIndex));
    });

    it('actives the indexes clicked by the user if the panels were closed', () => {
      const accordion = mountWithProvider(<Accordion panels={panels} />);
      getTitleButtonAtIndex(accordion, 0).simulate('click');
      getTitleButtonAtIndex(accordion, 2).simulate('click');
      expect(getNonExclusiveItemWithPropArray(accordion, 'active')).toEqual(expect.arrayContaining([0, 2]));
    });

    it('actives the only one index clicked by the user if exclusive prop is passed', () => {
      const accordion = mountWithProvider(<Accordion panels={panels} exclusive />);

      getTitleButtonAtIndex(accordion, 0).simulate('click');
      expect(
        accordion
          .find('AccordionTitle')
          .filterWhere(accordionTitle => accordionTitle.prop('active'))
          .prop('index'),
      ).toEqual(0);

      getTitleButtonAtIndex(accordion, 2).simulate('click');
      expect(
        accordion
          .find('AccordionTitle')
          .filterWhere(accordionTitle => accordionTitle.prop('active'))
          .prop('index'),
      ).toEqual(2);
    });

    it('deactivate indexes removed when their panels are closed by the user', () => {
      const accordion = mountWithProvider(<Accordion panels={panels} defaultActiveIndex={[0, 1, 2]} />);
      getTitleButtonAtIndex(accordion, 0).simulate('click');
      getTitleButtonAtIndex(accordion, 2).simulate('click');

      expect(getNonExclusiveItemWithPropArray(accordion, 'active')).toEqual(expect.arrayContaining([1]));
    });

    it('keeps the at least one panel open if expanded prop is passed', () => {
      const accordion = mountWithProvider(<Accordion panels={panels} defaultActiveIndex={[0]} expanded />);
      getTitleButtonAtIndex(accordion, 0).simulate('click');
      expect(getNonExclusiveItemWithPropArray(accordion, 'active')).toEqual(expect.arrayContaining([0]));
    });
  });

  describe('focusedIndex', () => {
    let { testContainer, removeTestContainer } = createTestContainer();
    beforeEach(() => {
      removeTestContainer();
      const { testContainer: newTestContainer, removeTestContainer: newRemoveTestContainer } = createTestContainer();

      testContainer = newTestContainer;
      removeTestContainer = newRemoveTestContainer;
    });

    it('is set at title click', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} />, { attachTo: testContainer });
      const accordion = wrapper.find(Accordion);
      getTitleButtonAtIndex(wrapper, 1).simulate('click');
      expect(getAccordionTitleAtIndex(accordion, 1)).toHaveFocus();
    });

    it('is changed by arrow key navigation', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} />, { attachTo: testContainer });
      const accordion = wrapper.find(Accordion);
      getTitleButtonAtIndex(wrapper, 1);
      getTitleButtonAtIndex(wrapper, 1).simulate('click');
      getTitleButtonAtIndex(wrapper, 1).simulate('keydown', {
        keyCode: keyboardKey.ArrowUp,
        key: 'ArrowUp',
      });
      expect(getAccordionTitleAtIndex(accordion, 0)).toHaveFocus();

      getTitleButtonAtIndex(wrapper, 0).simulate('keydown', {
        keyCode: keyboardKey.ArrowDown,
        key: 'ArrowDown',
      });
      expect(getAccordionTitleAtIndex(accordion, 1)).toHaveFocus();
    });

    it('is changed by arrow key navigation in a circular way', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} />, { attachTo: testContainer });
      const accordion = wrapper.find(Accordion);
      getTitleButtonAtIndex(wrapper, 0).simulate('click');
      getTitleButtonAtIndex(wrapper, 0).simulate('keydown', {
        keyCode: keyboardKey.ArrowUp,
        key: 'ArrowUp',
      });
      expect(getAccordionTitleAtIndex(accordion, panels.length - 1)).toHaveFocus();

      getTitleButtonAtIndex(wrapper, panels.length - 1).simulate('keydown', {
        keyCode: keyboardKey.ArrowDown,
        key: 'ArrowDown',
      });
      expect(getAccordionTitleAtIndex(accordion, 0)).toHaveFocus();
    });

    it('is changed to `0` at Home keydown', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} />, { attachTo: testContainer });
      const accordion = wrapper.find(Accordion);
      getTitleButtonAtIndex(wrapper, 2).simulate('click');
      getTitleButtonAtIndex(wrapper, 2).simulate('keydown', {
        keyCode: keyboardKey.Home,
        key: 'Home',
      });
      expect(getAccordionTitleAtIndex(accordion, 0)).toHaveFocus();
    });

    it('is changed to last index at End keydown', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} />, { attachTo: testContainer });
      const accordion = wrapper.find(Accordion);
      getTitleButtonAtIndex(wrapper, 0).simulate('click');
      getTitleButtonAtIndex(wrapper, 0).simulate('keydown', {
        keyCode: keyboardKey.End,
        key: 'End',
      });
      expect(getAccordionTitleAtIndex(accordion, panels.length - 1)).toHaveFocus();
    });

    it('focuses the button element when is changed via focus handler', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} />, { attachTo: testContainer });
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

    it('renders just active panels', () => {
      const defaultActiveIndex = [1, 2];
      const accordion = mountWithProviderAndGetComponent(
        Accordion,
        <Accordion panels={panels} defaultActiveIndex={defaultActiveIndex} />,
      );
      expect(getContentPanels(accordion).length).toBe(2);
    });
  });

  describe('accessibility', () => {
    handlesAccessibility(Accordion, { defaultRootRole: 'presentation' });
  });

  describe('HTML accessibility rules validation', () => {
    test('default Accordion', async () => await htmlIsAccessibilityCompliant(<Accordion panels={panels} />));
  });
});
