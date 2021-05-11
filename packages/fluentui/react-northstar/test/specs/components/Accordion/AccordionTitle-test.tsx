import * as React from 'react';
import { keyboardKey } from '@fluentui/accessibility';
import { AccordionTitle, accordionTitleSlotClassNames } from 'src/components/Accordion/AccordionTitle';
import { isConformant, handlesAccessibility } from 'test/specs/commonTests';
import { mountWithProvider } from 'test/utils';

describe('AccordionTitle', () => {
  isConformant(AccordionTitle, {
    testPath: __filename,
    constructorName: 'AccordionTitle',
    eventTargets: {
      onClick: `.${accordionTitleSlotClassNames.contentWrapper}`,
    },
  });

  describe('accessiblity', () => {
    describe('header', () => {
      handlesAccessibility(AccordionTitle, {
        requiredProps: { as: 'h3' },
        defaultRootRole: undefined,
      });
    });
    describe('div header', () => {
      handlesAccessibility(AccordionTitle, {
        defaultRootRole: 'heading',
      });
    });
  });

  const getContent = wrapper => wrapper.find(`div.${accordionTitleSlotClassNames.contentWrapper}`);

  describe('click handler', () => {
    it('is called on click', () => {
      const onClick = jest.fn();
      const wrapper = mountWithProvider(<AccordionTitle onClick={onClick} />);

      getContent(wrapper).simulate('click');
      expect(onClick).toHaveBeenCalled();
    });

    it('is not called on click for disabled title', () => {
      const onClick = jest.fn();
      const wrapper = mountWithProvider(<AccordionTitle onClick={onClick} disabled={true} />);

      getContent(wrapper).simulate('click');
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('Enter key', () => {
    it('calls onClick', () => {
      const onClick = jest.fn();
      const wrapper = mountWithProvider(<AccordionTitle onClick={onClick} />);

      getContent(wrapper).simulate('keydown', {
        keyCode: keyboardKey.Enter,
      });
      expect(onClick).toHaveBeenCalled();
    });

    it('does not call onClick for disabled title', () => {
      const onClick = jest.fn();
      const wrapper = mountWithProvider(<AccordionTitle onClick={onClick} disabled={true} />);

      getContent(wrapper).simulate('keydown', {
        keyCode: keyboardKey.Enter,
      });
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
