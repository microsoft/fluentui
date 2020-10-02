import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { setRTL } from '../../../Utilities';
import { PersonaCoin } from './PersonaCoin';
import { PersonaCoinBase } from './PersonaCoin.base';
import { wrapPersona } from '../Persona.test';

const testImage1x1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';

const coinProp = {
  text: 'Swapnil Vaibhav',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
  size: 15,
};

describe('PersonaCoin', () => {
  beforeEach(() => {
    setRTL(false);
  });

  it('renders correctly', () => {
    const component = renderer.create(<PersonaCoin />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with text', () => {
    const component = renderer.create(<PersonaCoin text="Kat Larrson" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with provided initials', () => {
    const component = renderer.create(<PersonaCoin imageInitials="JG" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with image', () => {
    const component = renderer.create(<PersonaCoin text="Kat Larrson" imageUrl={testImage1x1} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the initials before the image is loaded', () => {
    const component = renderer.create(
      <PersonaCoin text="Kat Larrson" imageUrl={testImage1x1} showInitialsUntilImageLoads={true} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('does not render the initials when showInitialsUntilImageLoads is false', () => {
    const component = renderer.create(
      <PersonaCoin text="Kat Larrson" imageUrl={testImage1x1} showInitialsUntilImageLoads={false} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with onRender callback', () => {
    const component = renderer.create(
      <PersonaCoin {...coinProp} onRenderCoin={wrapPersona(coinProp)} onRenderInitials={wrapPersona(coinProp)} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('sets isImageLoaded to false if imageUrl changes from valid to undefined', () => {
    const component = shallow(<PersonaCoinBase imageUrl={testImage1x1} />);
    component.setState({ isImageLoaded: true });
    component.setProps({ imageUrl: undefined });
    const isImageLoaded = component.state('isImageLoaded');
    expect(isImageLoaded).toBe(false);
  });
});
