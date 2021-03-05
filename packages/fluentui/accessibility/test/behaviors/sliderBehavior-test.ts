import { sliderBehavior } from '@fluentui/accessibility';

type SliderBehaviorTestOptions = {
  propName: string;
  propValue: string | boolean | number;
  slotName: string;
  attrName: string;
  result?: string;
};

function generatePropertyTest({ result, attrName, propName, propValue, slotName }: SliderBehaviorTestOptions) {
  test(`${attrName} is set based on property ${propName}:${propValue}`, () => {
    const resultValue = result || propValue;
    const props = {
      [propName]: propValue,
      getA11yValueMessageOnChange: () => {
        return undefined;
      },
    };
    const expectedResult = sliderBehavior(props);
    expect(expectedResult.attributes[slotName][attrName]).toEqual(resultValue);
  });
}

describe('SliderBehavior.ts', () => {
  generatePropertyTest({
    propName: 'disabled',
    propValue: true,
    slotName: 'root',
    attrName: 'aria-disabled',
  });
  generatePropertyTest({
    propName: 'min',
    propValue: 0,
    slotName: 'input',
    attrName: 'aria-valuemin',
  });
  generatePropertyTest({
    propName: 'max',
    propValue: 0,
    slotName: 'input',
    attrName: 'aria-valuemax',
  });
  generatePropertyTest({
    propName: 'value',
    propValue: 0,
    slotName: 'input',
    attrName: 'aria-valuenow',
  });
  generatePropertyTest({
    propName: 'vertical',
    propValue: true,
    slotName: 'input',
    attrName: 'aria-orientation',
    result: 'vertical',
  });
  generatePropertyTest({
    propName: 'vertical',
    propValue: false,
    slotName: 'input',
    attrName: 'aria-orientation',
    result: 'horizontal',
  });

  test('aria-valuetext is set based on the property getA11yValueMessageOnChange', () => {
    const ariaValueText = 'custom aria value text';
    const customAriaValueText = () => {
      return ariaValueText;
    };
    const property = {
      getA11yValueMessageOnChange: customAriaValueText,
    };
    const expectedResult = sliderBehavior(property);
    expect(expectedResult.attributes.input['aria-valuetext']).toEqual(ariaValueText);
  });
});
