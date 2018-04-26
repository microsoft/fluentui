import * as React from 'react';

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { Slider } from './Slider';
import { ISlider } from './Slider.types';

describe('Slider', () => {

  it('renders Slider correctly', () => {
    const component = renderer.create(<Slider />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a slider', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Slider label='slider' />
    );
    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;
    const labelElement = renderedDOM.querySelector('.ms-Label') as HTMLElement;

    expect(labelElement.textContent).toEqual('slider');
  });

  it('can slide to default min/max and execute onChange', () => {
    let changedValue;
    const onChange = (val: any) => {
      changedValue = val;
    };
    const component = ReactTestUtils.renderIntoDocument<React.ReactInstance>(
      <Slider
        onChange={ onChange }
      />
    );

    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;
    const sliderLine = renderedDOM.querySelector('.ms-Slider-line') as HTMLElement;
    const sliderThumb = renderedDOM.querySelector('.ms-Slider-slideBox') as HTMLElement;

    sliderLine.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      right: 100,
      bottom: 40,
      width: 100,
      height: 40
    });

    ReactTestUtils.Simulate.mouseDown(sliderThumb, {
      type: 'mousedown',
      clientX: 100,
      clientY: 0
    });

    // Default max is 10.
    expect(changedValue).toEqual(10);

    ReactTestUtils.Simulate.mouseDown(sliderThumb, {
      type: 'mousedown',
      clientX: 0,
      clientY: 0
    });

    // Default min is 0.
    expect(changedValue).toEqual(0);
  });

  it('has type=button on all buttons', () => {
    const component = ReactTestUtils.renderIntoDocument<React.ReactInstance>(
      <Slider />
    );

    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;
    const allButtons = renderedDOM.querySelectorAll('button');

    for (let i = 0; i < allButtons.length; i++) {
      const button = allButtons[i];

      expect(button.getAttribute('type')).toEqual('button');
    }
  });

  it('can read the current value', () => {
    let slider: ISlider | null;

    ReactTestUtils.renderIntoDocument(
      // tslint:disable-next-line:jsx-no-lambda
      <Slider label='slider' defaultValue={ 12 } min={ 0 } max={ 100 } componentRef={ s => slider = s } />
    );
    expect(slider!.value).toEqual(12);
  });

  it('renders correct aria-valuetext', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Slider />
    );
    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;
    let button = renderedDOM.querySelector('.ms-Slider-slideBox') as HTMLElement;
    let ariaValueText = button.getAttribute('aria-valuetext');

    expect(ariaValueText).toBeNull();

    const values = ['small', 'medium', 'large'];
    const selected = 1;
    const getTextValue = (value: number) => values[value];

    component = ReactTestUtils.renderIntoDocument(
      <Slider
        value={ selected }
        ariaValueText={ getTextValue }
      />
    );
    renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance) as Element;
    button = renderedDOM.querySelector('.ms-Slider-slideBox') as HTMLElement;
    ariaValueText = button.getAttribute('aria-valuetext');

    expect(ariaValueText).toEqual(values[selected]);
  });
});
