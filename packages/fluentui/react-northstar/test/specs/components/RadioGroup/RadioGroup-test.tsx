import * as React from 'react';

import { isConformant, handlesAccessibility, htmlIsAccessibilityCompliant } from 'test/specs/commonTests';
import { implementsCollectionShorthandProp } from '../../commonTests/implementsCollectionShorthandProp';
import { mountWithProvider } from 'test/utils';

import { RadioGroup } from 'src/components/RadioGroup/RadioGroup';
import { RadioGroupItem } from 'src/components/RadioGroup/RadioGroupItem';

const radioGroupImplementsCollectionShorthandProp = implementsCollectionShorthandProp(RadioGroup);

const getShorthandItems = (props?: { disabledItem?: number }) => [
  {
    name: 'test-name',
    key: 'test-key1',
    label: 'test-label1',
    value: 'test-value1',
    'data-foo': 'something',
    onClick: jest.fn(),
    disabled: props && props.disabledItem === 0,
  },
  {
    name: 'test-name',
    key: 'test-key2',
    label: 'test-label2',
    value: 'test-value2',
    'data-foo': 'something',
    disabled: props && props.disabledItem === 1,
  },
  {
    name: 'test-name',
    key: 'test-key3',
    label: 'test-label3',
    value: 'test-value3',
    'data-foo': 'something',
    disabled: props && props.disabledItem === 2,
  },
];

describe('RadioGroup', () => {
  isConformant(RadioGroup, {
    testPath: __filename,
    constructorName: 'RadioGroup',
    autoControlledProps: ['checkedValue'],
  });

  describe('accessibility', () => {
    handlesAccessibility(RadioGroup, {
      defaultRootRole: 'radiogroup',
    });

    test('compliance', async () => await htmlIsAccessibilityCompliant(<RadioGroup items={getShorthandItems()} />));
  });

  describe('implementsCollectionShorthandProp', () => {
    radioGroupImplementsCollectionShorthandProp('items', RadioGroupItem, {
      mapsValueToProp: false,
    });
  });

  const itemsTest = (getItems: Function, isShorthandApiTest: boolean = true) => {
    it('renders children', () => {
      const items = mountWithProvider(<RadioGroup items={getItems()} />).find('RadioGroupItem');

      expect(items.length).toBe(3);
      expect(items.first().props().label).toBe('test-label1');
      expect(items.last().props().label).toBe('test-label3');
    });

    it('calls onClick handler for item', () => {
      const items = getItems();
      const radioGroupItems = mountWithProvider(<RadioGroup items={items} />).find('RadioGroupItem');

      radioGroupItems.first().find('div').first().simulate('click');

      const onClick = items[0].onClick || items[0].props.onClick;
      expect(onClick).toHaveBeenCalled();
    });

    it('calls onChange handler for item with updated checked state', () => {
      const onChange = jest.fn();
      const items = [
        {
          name: 'test-name',
          key: 'test-key0',
          label: 'test-label0',
          value: 'test-value0',
          onChange,
        },
        ...getItems(),
      ];
      const wrapper = mountWithProvider(<RadioGroup items={items} />);
      const radioGroupItems = wrapper.find('RadioGroupItem');

      radioGroupItems.first().simulate('click');
      expect(onChange).toHaveBeenCalledWith(undefined, expect.objectContaining({ checked: true }));

      radioGroupItems.last().simulate('click');
      expect(onChange).toHaveBeenCalledWith(undefined, expect.objectContaining({ checked: false }));
    });

    it('passes arbitrary props', () => {
      const radioGroupItems = mountWithProvider(<RadioGroup items={getItems()} />).find('RadioGroupItem');

      expect(radioGroupItems.everyWhere(item => item.prop('data-foo') === 'something')).toBe(true);
    });

    describe('checkedValue', () => {
      it('should not be set and first item is focusable by default', () => {
        const radioGroupItems = mountWithProvider(<RadioGroup items={getItems()} />).find('RadioGroupItem');

        expect(radioGroupItems.everyWhere(item => !item.is('[checked="true"]'))).toBe(true);
        expect(radioGroupItems.at(0).props().tabIndex).toBe(0);
      });
    });

    if (isShorthandApiTest) {
      describe('click event handler', () => {
        it('should set "checked" when item is clicked', () => {
          const onCheckedValueChange = jest.fn();
          const wrapper = mountWithProvider(
            <RadioGroup items={getItems()} onCheckedValueChange={onCheckedValueChange} />,
          );
          const radioGroupItems = wrapper.find('RadioGroupItem');

          radioGroupItems.at(1).find('div').first().simulate('click');

          const updatedItems = wrapper.find('RadioGroupItem');

          expect(updatedItems.at(0).props().checked).toBe(false);
          expect(updatedItems.at(1).props().checked).toBe(true);

          expect(onCheckedValueChange).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({ value: 'test-value2' }),
          );
        });
      });
    }

    it('should not call checkedValueChanged when index did not change', () => {
      const onCheckedValueChange = jest.fn();
      const wrapper = mountWithProvider(
        <RadioGroup items={getItems()} onCheckedValueChange={onCheckedValueChange} checkedValue="test-value2" />,
      );
      const radioGroupItems = wrapper.find('RadioGroupItem');

      radioGroupItems.at(1).find('div').first().simulate('click');

      expect(onCheckedValueChange).not.toHaveBeenCalled();
    });

    if (isShorthandApiTest) {
      it('should not set "checked" when disabled item is clicked', () => {
        const wrapper = mountWithProvider(<RadioGroup items={getItems({ disabledItem: 1 })} />);
        const radioGroupItems = wrapper.find('RadioGroupItem');

        radioGroupItems.at(1).find('div').first().simulate('click');

        const updatedItems = wrapper.find('RadioGroupItem');

        expect(updatedItems.at(0).props().checked).toBe(false);
        expect(updatedItems.at(1).props().checked).toBe(false);
      });
    }

    describe('keyDown event handler', () => {
      const testKeyDown = (testName, items, initialValue, keyCode, expectedValue) => {
        it(`keyDown test - ${testName}`, () => {
          const onCheckedValueChange = jest.fn();
          const wrapper = mountWithProvider(
            <RadioGroup items={items} checkedValue={initialValue} onCheckedValueChange={onCheckedValueChange} />,
          );

          wrapper
            .find('div')
            .first()
            .simulate('keyDown', { preventDefault() {}, keyCode, which: keyCode });

          expect(onCheckedValueChange).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({ value: expectedValue }),
          );
        });
      };

      testKeyDown('should check next value when right arrow is pressed', getItems(), 'test-value1', 39, 'test-value2');
      testKeyDown(
        'should check previous value when left arrow is pressed',
        getItems(),
        'test-value2',
        37,
        'test-value1',
      );
      testKeyDown(
        'should check first value when right arrow is pressed and last item was checked',
        getItems(),
        'test-value3',
        39,
        'test-value1',
      );
      testKeyDown(
        'should check last value when left arrow is pressed and first item was checked',
        getItems(),
        'test-value1',
        37,
        'test-value3',
      );

      testKeyDown(
        'should skip disabled when right arrow is pressed',
        getItems({ disabledItem: 1 }),
        'test-value1',
        39,
        'test-value3',
      );
      testKeyDown(
        'should skip disabled when left arrow is pressed',
        getItems({ disabledItem: 1 }),
        'test-value3',
        37,
        'test-value1',
      );
    });
  };

  describe('shorthand API for items', () => {
    itemsTest(getShorthandItems);
  });
});
