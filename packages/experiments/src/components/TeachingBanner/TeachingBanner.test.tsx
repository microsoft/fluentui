import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { TeachingBanner } from './TeachingBanner';
import { mount } from 'enzyme';

const noop = () => null;

describe('TeachingBanner', () => {
  it('renders correctly with no props', () => {
    const tree = renderer.create(<TeachingBanner />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders children prop correctly', () => {
    const tree = renderer.create(<TeachingBanner>Text</TeachingBanner>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders children prop correctly', () => {
    const component = mount(<TeachingBanner>Text</TeachingBanner>);
    expect(
      component
        .find('.ms-TeachingBanner-content')
        .first()
        .text()
    ).toEqual('Text');
  });

  it('matches children prop snapshot', () => {
    const tree = renderer.create(<TeachingBanner>Text</TeachingBanner>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render dismiss button', () => {
    const component = mount(<TeachingBanner onDismiss={noop} />);
    expect(component.find('.ms-TeachingBanner-dismiss').first()).toBeTruthy();
  });
});
