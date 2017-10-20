/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { Icon } from './Icon';
import { IconType, IIconProps } from './Icon.Props';
import { registerIconRenderer, getIconFromRendererFunctions } from './registerIconRenderer';
import { TestImages } from '../../common/TestImages';
import { shallow } from 'enzyme';

describe('Test registerIconRenderer', () => {
  it('registered renderer function gets invoked on Icon render', () => {
    const mockIconRenderer = jest.fn();
    registerIconRenderer(mockIconRenderer);
    shallow(<Icon iconType={ IconType.image } imageProps={ { src: TestImages.iconOne } } />);
    expect(mockIconRenderer.mock.calls.length).toBe(1);
  });

  it('unsubscribe detaches renderer function', () => {
    const mockIconRenderer = jest.fn();
    let unsubscribeCustomRenderer = registerIconRenderer(mockIconRenderer);
    shallow(<Icon iconType={ IconType.image } imageProps={ { src: TestImages.iconOne } } />);
    unsubscribeCustomRenderer();
    shallow(<Icon iconType={ IconType.image } imageProps={ { src: TestImages.iconOne } } />);
    expect(mockIconRenderer.mock.calls.length).toBe(1);
  });

  it('uses multiple renderer functions when appropriate', () => {
    const mockIconRendererOne = jest.fn();
    registerIconRenderer(mockIconRendererOne);
    shallow(<Icon iconType={ IconType.image } imageProps={ { src: TestImages.iconOne } } />);
    const mockIconRendererTwo = jest.fn();
    registerIconRenderer(mockIconRendererTwo);

    // Note that neither renderer ever returns a JSX.Element so Icon render should try both fns
    shallow(<Icon iconType={ IconType.image } imageProps={ { src: TestImages.iconOne } } />);
    expect(mockIconRendererOne.mock.calls.length).toBe(2);
    expect(mockIconRendererTwo.mock.calls.length).toBe(1);
  });

  it('renderer function overrides Icon render behavior', () => {
    // Rendering the OneNote icon does not result in svg elements
    const oneNoteIcon = <Icon iconName='One' iconType={ IconType.image } imageProps={ { src: TestImages.iconOne } } />;
    let wrapper = shallow(oneNoteIcon);
    expect(wrapper.find('svg').length).toEqual(0);

    // Unless we add an iconRenderer fn that causes the icon to render as an SVG circle
    registerIconRenderer((iconProps: IIconProps) => {
      return (iconProps.iconName === 'One') ? <svg xmlns='http://www.w3.org/2000/svg'><circle cx='5' cy='5' r='5' /></svg> : null;
    });
    wrapper = shallow(oneNoteIcon);
    expect(wrapper.find('svg').length).toEqual(1);
  });

  it('renderer function only affects intentional icons', () => {
    const wrapper1 = shallow(<Icon iconName='PPT' iconType={ IconType.image } imageProps={ { src: TestImages.iconPpt } } />);
    registerIconRenderer((iconProps: IIconProps) => {
      return (iconProps.iconName === 'One') ? <svg xmlns='http://www.w3.org/2000/svg'><circle cx='5' cy='5' r='5' /></svg> : null;
    });
    const wrapper2 = shallow(<Icon iconName='PPT' iconType={ IconType.image } imageProps={ { src: TestImages.iconPpt } } />);
    expect(wrapper1 === wrapper2);
  });
});