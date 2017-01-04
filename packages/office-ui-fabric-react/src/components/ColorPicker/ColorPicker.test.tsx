/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactTestUtils from 'react-addons-test-utils';
import { ColorPicker } from './ColorPicker';

let { expect } = chai;

describe('ColorPicker', () => {
  it('Props are correctly parsed', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <ColorPicker color='#FFFFFF' />
    ) as ColorPicker;

    expect(component.state.color.hex).to.equal('ffffff');
  });

  it('Reacts to props changes', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <ColorPicker color='#FFFFFF' />
    ) as ColorPicker;

    component.componentWillReceiveProps({ color: '#AEAEAE' });
    expect(component.state.color.hex).to.equal('aeaeae');
  });

  it('onColorChange is called', () => {
    let color = '#FFFFFF';
    let component = ReactTestUtils.renderIntoDocument(
      <ColorPicker color={ color } onColorChanged={ str => color = str } />
    ) as ColorPicker;

    const newColor = '#AEAEAE';
    component.componentWillReceiveProps({ color: newColor });

    expect(component.state.color.hex).to.equal('aeaeae');
    expect(color).to.equal(newColor);
  });
});
