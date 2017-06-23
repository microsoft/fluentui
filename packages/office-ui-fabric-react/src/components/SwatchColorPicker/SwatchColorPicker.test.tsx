/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as ReactTestUtils from 'react-addons-test-utils';
import { SwatchColorPicker } from './SwatchColorPicker';

let { expect } = chai;
/*
describe('SwatchColorPicker', () => {
  it('Props are correctly parsed', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <SwatchColorPicker color='#FFFFFF' />
    ) as SwatchColorPicker;

    expect(component.state.color.hex).to.equal('ffffff');
  });

  it('Reacts to props changes', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <SwatchColorPicker color='#FFFFFF' />
    ) as SwatchColorPicker;

    component.componentWillReceiveProps({ color: '#AEAEAE' });
    expect(component.state.color.hex).to.equal('aeaeae');
  });

  it('onColorChange is called', () => {
    let color = '#FFFFFF';
    let component = ReactTestUtils.renderIntoDocument(
      <SwatchColorPicker color={ color } onColorChanged={ str => color = str } />
    ) as SwatchColorPicker;

    const newColor = '#AEAEAE';
    component.componentWillReceiveProps({ color: newColor });

    expect(component.state.color.hex).to.equal('aeaeae');
    expect(color).to.equal(newColor);
  });

  it('Hides alpha control slider', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <SwatchColorPicker color='#FFFFFF' alphaSliderHidden={ true } />
    ) as SwatchColorPicker;

    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let alphaSlider = renderedDOM.querySelector('.is-alpha');
    let alphaTableHeader = renderedDOM.querySelector('.ms-SwatchColorPicker-table > thead > tr > td:nth-child(5)');
    let alphaTableInput = renderedDOM.querySelector('.ms-SwatchColorPicker-table > tbody> tr > td:nth-child(5)');

    expect(alphaSlider).to.be.eq(null);
    expect(alphaTableHeader).to.be.eq(null);
    expect(alphaTableInput).to.be.eq(null);
  });
});
*/