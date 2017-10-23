/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { ColorPicker } from './ColorPicker';

describe('ColorPicker', () => {
  it('renders ColorPicker correctly', () => {
    const component = renderer.create(
      <ColorPicker color='#FFFFFF' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Props are correctly parsed', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <ColorPicker color='#FFFFFF' />
    ) as ColorPicker;

    expect(component.state.color.hex).toEqual('ffffff');
  });

  it('Reacts to props changes', () => {
    const component = ReactTestUtils.renderIntoDocument(
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

    const component = ReactTestUtils.renderIntoDocument(
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
    const component = ReactTestUtils.renderIntoDocument(
      <ColorPicker color='#FFFFFF' alphaSliderHidden={ true } />
    ) as ColorPicker;

    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    const alphaSlider = renderedDOM.querySelector('.is-alpha');
    const alphaTableHeader = renderedDOM.querySelector('.ms-ColorPicker-table > thead > tr > td:nth-child(5)');
    const alphaTableInput = renderedDOM.querySelector('.ms-ColorPicker-table > tbody> tr > td:nth-child(5)');

    expect(alphaSlider).toBeNull();
    expect(alphaTableHeader).toBeNull();
    expect(alphaTableInput).toBeNull();
  });

  it('Renders default RGBA/Hex strings', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <ColorPicker color='#FFFFFF' />
    ) as ColorPicker;

    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    const tableHeaders = renderedDOM.querySelectorAll('.ms-ColorPicker-table > thead > tr > td') as NodeListOf<HTMLTableDataCellElement>;

    const hexTableHeader = tableHeaders[0];
    expect(hexTableHeader.textContent).toEqual(ColorPicker.defaultProps.hexLabel);

    const redTableHeader = tableHeaders[1];
    expect(redTableHeader.textContent).toEqual(ColorPicker.defaultProps.redLabel);

    const greenTableHeader = tableHeaders[2];
    expect(greenTableHeader.textContent).toEqual(ColorPicker.defaultProps.greenLabel);

    const blueTableHeader = tableHeaders[3];
    expect(blueTableHeader.textContent).toEqual(ColorPicker.defaultProps.blueLabel);

    const alphaTableHeader = tableHeaders[4];
    expect(alphaTableHeader.textContent).toEqual(ColorPicker.defaultProps.alphaLabel);
  });

  it('Renders custom RGBA/Hex strings', () => {
    const customHexLabel = 'Custom Hex';
    const customRedLabel = 'Custom Red';
    const customGreenLabel = 'Custom Green';
    const customBlueLabel = 'Custom Blue';
    const customAlphaLabel = 'Custom Alpha';

    const component = ReactTestUtils.renderIntoDocument(
      <ColorPicker
        color='#FFFFFF'
        hexLabel={ customHexLabel }
        redLabel={ customRedLabel }
        greenLabel={ customGreenLabel }
        blueLabel={ customBlueLabel }
        alphaLabel={ customAlphaLabel }
      />
    ) as ColorPicker;

    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    const tableHeaders = renderedDOM.querySelectorAll('.ms-ColorPicker-table > thead > tr > td') as NodeListOf<HTMLTableDataCellElement>;

    const hexTableHeader = tableHeaders[0];
    expect(hexTableHeader.textContent).toEqual(customHexLabel);

    const redTableHeader = tableHeaders[1];
    expect(redTableHeader.textContent).toEqual(customRedLabel);

    const greenTableHeader = tableHeaders[2];
    expect(greenTableHeader.textContent).toEqual(customGreenLabel);

    const blueTableHeader = tableHeaders[3];
    expect(blueTableHeader.textContent).toEqual(customBlueLabel);

    const alphaTableHeader = tableHeaders[4];
    expect(alphaTableHeader.textContent).toEqual(customAlphaLabel);
  });
});
