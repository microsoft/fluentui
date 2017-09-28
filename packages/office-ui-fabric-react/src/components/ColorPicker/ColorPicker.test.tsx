/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as ReactTestUtils from 'react-addons-test-utils';
import { ColorPicker } from './ColorPicker';

describe('ColorPicker', () => {
  it('Props are correctly parsed', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <ColorPicker color='#FFFFFF' />
    ) as ColorPicker;

    expect(component.state.color.hex).toEqual('ffffff');
  });

  it('Reacts to props changes', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <ColorPicker color='#FFFFFF' />
    ) as ColorPicker;

    component.componentWillReceiveProps({ color: '#AEAEAE' });
    expect(component.state.color.hex).toEqual('aeaeae');
  });

  it('onColorChange is called', () => {
    let color = '#FFFFFF';
    const onColorChanged = (str: string): void => {
      color = str;
    };

    let component = ReactTestUtils.renderIntoDocument(
      <ColorPicker
        color={ color }
        onColorChanged={ onColorChanged }
      />
    ) as ColorPicker;

    const newColor = '#AEAEAE';
    component.componentWillReceiveProps({ color: newColor });

    expect(component.state.color.hex).toEqual('aeaeae');
    expect(color).toEqual(newColor);
  });

  it('Hides alpha control slider', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <ColorPicker color='#FFFFFF' alphaSliderHidden={ true } />
    ) as ColorPicker;

    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let alphaSlider = renderedDOM.querySelector('.is-alpha');
    let alphaTableHeader = renderedDOM.querySelector('.ms-ColorPicker-table > thead > tr > td:nth-child(5)');
    let alphaTableInput = renderedDOM.querySelector('.ms-ColorPicker-table > tbody> tr > td:nth-child(5)');

    expect(alphaSlider).toBeNull();
    expect(alphaTableHeader).toBeNull();
    expect(alphaTableInput).toBeNull();
  });
});
