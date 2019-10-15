import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Fabric } from './Fabric';
import { renderIntoDocument } from '../../common/testUtilities';

describe('Fabric', () => {
  it('renders a Fabric component correctly', () => {
    const component = renderer.create(<Fabric>test</Fabric>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a Fabric component with applyTheme correctly', () => {
    const renderedDOM: HTMLElement = renderIntoDocument(<Fabric applyTheme>test</Fabric>);
    expect(renderedDOM.getElementsByClassName('ms-Fabric root-themed')).toBeTruthy();
  });

  it('renders a Fabric component with applyThemeToBody correctly', () => {
    const renderedDOM: HTMLElement = renderIntoDocument(<Fabric applyThemeToBody>test</Fabric>);
    expect(renderedDOM.getElementsByClassName('ms-Fabric-body-themed')).toBeTruthy();
  });
});
