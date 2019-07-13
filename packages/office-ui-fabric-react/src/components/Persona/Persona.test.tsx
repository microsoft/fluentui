/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { setRTL, IRenderFunction } from '../../Utilities';
import { Persona } from './Persona';
import { mount, ReactWrapper } from 'enzyme';
import { getIcon } from '../../Styling';
import { IPersonaSharedProps, IPersonaProps, IPersonaCoinProps, PersonaPresence, PersonaSize } from '../../index';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TestImages } from 'office-ui-fabric-react/lib/common/TestImages';

const testImage1x1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';
const STYLES = {
  green: '.ms-Persona-initials--green',
  initials: '.ms-Persona-initials',
  primaryText: '.ms-Persona-primaryText',
  black: '.ms-Persona-initials--black',
  red: '.ms-Persona-initials--red'
};

/**
 * function to override the default onRender callbacks
 */
export const wrapPersona = (
  example: IPersonaSharedProps,
  shouldWrapPersonaCoin: boolean = false
): ((coinProps: IPersonaProps, defaultRenderer: IRenderFunction<IPersonaProps>) => JSX.Element | null) => {
  return (coinProps, defaultCoinRenderer): JSX.Element | null => {
    return shouldWrapPersonaCoin ? (
      <span id="persona-coin-container">{defaultCoinRenderer(coinProps)}</span>
    ) : (
      defaultCoinRenderer(coinProps)
    );
  };
};

const customOnRenderPersonaFunction = (props: IPersonaCoinProps): JSX.Element | null => {
  return <Icon iconName="Dictionary" />;
};

const examplePersona: IPersonaSharedProps = {
  imageUrl: TestImages.personaMale,
  imageInitials: 'SV',
  text: 'Swapnil Vaibhav',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
  size: PersonaSize.size100,
  presence: PersonaPresence.blocked
};

describe('Persona', () => {
  beforeEach(() => {
    setRTL(false);
  });

  it('renders Persona correctly with no props', () => {
    const component = renderer.create(<Persona />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona correctly with initials', () => {
    const component = renderer.create(<Persona text="Kat Larrson" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona correctly with image', () => {
    const component = renderer.create(<Persona text="Kat Larrson" imageUrl={testImage1x1} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona correctly with UnknownPersona coin', () => {
    const component = renderer.create(<Persona text="Kat Larrson" showUnknownPersonaCoin={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona which calls onRenderCoin callback without imageUrl', () => {
    // removing imageUrl prop from example
    const { imageUrl, ...exampleWithoutImage } = examplePersona;
    const component = renderer.create(<Persona {...exampleWithoutImage} onRenderCoin={wrapPersona(exampleWithoutImage, true)} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona which calls onRenderPersonaCoin callback with custom render', () => {
    const component = renderer.create(<Persona {...examplePersona} onRenderPersonaCoin={customOnRenderPersonaFunction} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with onRender callback', () => {
    const component = renderer.create(
      <Persona
        {...examplePersona}
        onRenderPrimaryText={wrapPersona(examplePersona)}
        onRenderSecondaryText={wrapPersona(examplePersona)}
        onRenderTertiaryText={wrapPersona(examplePersona)}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona children correctly', () => {
    const component = renderer.create(
      <Persona text="Kat Larrson">
        <span>Persona Children</span>
      </Persona>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('initials and colors', () => {
    it('calculates an expected initials in LTR if one was not specified', () => {
      let wrapper = mount(<Persona text="Kat Larrson" />);
      let result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('KL');
      wrapper.unmount();

      wrapper = mount(<Persona text="David Zearing-Goff" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('DZ');
      wrapper.unmount();

      wrapper = mount(<Persona text="4lex 5loo" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('45');
      wrapper.unmount();

      wrapper = mount(<Persona text="Swapnil Vaibhav" />);
      result = wrapper.find(STYLES.primaryText);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('Swapnil Vaibhav');
      wrapper.unmount();

      wrapper = mount(<Persona text="+1 (555) 6789" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual(getIcon('contact')!.code);
      wrapper.unmount();

      wrapper = mount(<Persona text="+1 (555) 6789" allowPhoneInitials={true} />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('16');
      wrapper.unmount();

      wrapper = mount(<Persona text="David (The man) Goff" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('DG');
    });

    it('calculates an expected initials in RTL if one was not specified', () => {
      setRTL(true);
      const wrapper = mount(<Persona text="Kat Larrson" />);
      const result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('LK');

      setRTL(false);
    });

    it('uses provided initial', () => {
      setRTL(true);
      const wrapper = mount(<Persona text="Kat Larrson" imageInitials="AT" />);
      const result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('AT');

      setRTL(false);
    });
  });

  describe('image', () => {
    it('renders empty alt text by default', () => {
      const wrapper = mount(<Persona text="Kat Larrson" imageUrl={testImage1x1} />);
      const image: ReactWrapper<React.ImgHTMLAttributes<any>, any> = wrapper.find('ImageBase');

      expect(image.props().alt).toEqual('');
    });

    it('renders its given alt text', () => {
      const wrapper = mount(<Persona text="Kat Larrson" imageUrl={testImage1x1} imageAlt="ALT TEXT" />);
      const image: ReactWrapper<React.ImgHTMLAttributes<any>, any> = wrapper.find('ImageBase');

      expect(image.props().alt).toEqual('ALT TEXT');
    });
  });
});
