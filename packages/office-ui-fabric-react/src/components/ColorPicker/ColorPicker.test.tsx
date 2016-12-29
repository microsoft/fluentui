/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { ColorPicker } from './ColorPicker';

describe('ColorPicker', () => {

  it('Props are correctly parsed', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <ColorPicker color='#FFFFFF'/>
    ) as ColorPicker;

    expect(component.state.color.hex).to.equal('ffffff');
  });

  it('Reacts to props changes', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <ColorPicker color='#FFFFFF'/>
    ) as ColorPicker;

    component.componentWillReceiveProps({ color: '#AEAEAE' });
    expect(component.state.color.hex).to.equal('aeaeae');
  });
});
