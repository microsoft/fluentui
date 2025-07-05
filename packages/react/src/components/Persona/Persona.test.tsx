import '@testing-library/jest-dom';
import * as React from 'react';
import { create } from '@fluentui/test-utilities';
import { TestImages } from '@fluentui/example-data';
import { Icon } from '../../Icon';
import { setRTL } from '../../Utilities';
import { Persona } from './Persona';
import { render, screen } from '@testing-library/react';
import { getIcon } from '../../Styling';
import { PersonaPresence, PersonaSize } from './index';
import { isConformant } from '../../common/isConformant';
import type { IPersonaSharedProps, IPersonaCoinProps } from './index';
import { wrapPersona } from './test-utils';

const testImage1x1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';
// NOTES: The following styles have been used with enzyme previously, keeping here for reference.
// const STYLES = {
//   green: '.ms-Persona-initials--green',
//   initials: '.ms-Persona-initials',
//   primaryText: '.ms-Persona-primaryText',
//   black: '.ms-Persona-initials--black',
//   red: '.ms-Persona-initials--red',
// };

// eslint-disable-next-line @typescript-eslint/no-deprecated
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
  presence: PersonaPresence.blocked,
};

describe('Persona', () => {
  beforeEach(() => {
    setRTL(false);
  });

  it('renders Persona correctly with no props', () => {
    const component = create(<Persona />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona correctly with initials', () => {
    const component = create(<Persona text="Kat Larrson" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona correctly with image', () => {
    const component = create(<Persona text="Kat Larrson" imageUrl={testImage1x1} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona correctly with UnknownPersona coin', () => {
    const component = create(<Persona text="Kat Larrson" showUnknownPersonaCoin={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona which calls onRenderCoin callback without imageUrl', () => {
    // removing imageUrl prop from example
    const { imageUrl, ...exampleWithoutImage } = examplePersona;
    const component = create(
      <Persona
        {...exampleWithoutImage}
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        onRenderCoin={wrapPersona(exampleWithoutImage, true)}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona which calls onRenderPersonaCoin callback with custom render', () => {
    const component = create(<Persona {...examplePersona} onRenderPersonaCoin={customOnRenderPersonaFunction} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with onRender callback', () => {
    const component = create(
      <Persona
        {...examplePersona}
        onRenderPrimaryText={wrapPersona(examplePersona)}
        onRenderSecondaryText={wrapPersona(examplePersona)}
        onRenderTertiaryText={wrapPersona(examplePersona)}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona children correctly', () => {
    const component = create(
      <Persona text="Kat Larrson">
        <span>Persona Children</span>
      </Persona>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: Persona,
    displayName: 'Persona',
  });

  describe('initials and colors', () => {
    it('calculates an expected initials in LTR if one was not specified', () => {
      const { rerender } = render(<Persona text="Kat Larrson" />);
      const initials = screen.getByText('KL');
      expect(initials).toBeInTheDocument();

      rerender(<Persona text="David Zearing-Goff" />);
      const initialsDZ = screen.getByText('DZ');
      expect(initialsDZ).toBeInTheDocument();

      rerender(<Persona text="4lex 5loo" />);
      const initials45 = screen.getByText('45');
      expect(initials45).toBeInTheDocument();

      rerender(<Persona text="Swapnil Vaibhav" />);
      const primaryText = screen.getByText('SV');
      expect(primaryText).toBeInTheDocument();

      const contactIconCode = getIcon('contact')?.code || '';
      rerender(<Persona text="+1 (555) 6789" />);
      const contactIcon = screen.getByText(contactIconCode);
      expect(contactIcon).toBeInTheDocument();

      rerender(<Persona text="+1 (555) 6789" allowPhoneInitials={true} />);
      const phoneInitials = screen.getByText('16');
      expect(phoneInitials).toBeInTheDocument();

      rerender(<Persona text="David (The man) Goff" />);
      const initialsDG = screen.getByText('DG');
      expect(initialsDG).toBeInTheDocument();

      rerender(<Persona text="David [The man] Goff" />);
      const initialsDGBracket = screen.getByText('DG');
      expect(initialsDGBracket).toBeInTheDocument();

      rerender(<Persona text="David Goff {The man}" />);
      const initialsDGCurly = screen.getByText('DG');
      expect(initialsDGCurly).toBeInTheDocument();

      rerender(<Persona text="David Goff <The man>" />);
      const initialsDGAngle = screen.getByText('DG');
      expect(initialsDGAngle).toBeInTheDocument();

      rerender(<Persona text="David Goff (The man) <David.Goff@example.com>" />);
      const initialsDGComplex = screen.getByText('DG');
      expect(initialsDGComplex).toBeInTheDocument();
    });

    it('calculates an expected initials in RTL if one was not specified', () => {
      setRTL(true);
      render(<Persona text="Kat Larrson" />);
      const initials = screen.getByText('LK');
      expect(initials).toBeInTheDocument();
      setRTL(false);
    });

    it('uses provided initial', () => {
      setRTL(true);
      render(<Persona text="Kat Larrson" imageInitials="AT" />);
      const initials = screen.getByText('AT');
      expect(initials).toBeInTheDocument();
      setRTL(false);
    });
  });

  describe('image', () => {
    it('renders empty alt text by default', () => {
      const { container } = render(<Persona text="Kat Larrson" imageUrl={testImage1x1} />);
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', '');
    });

    it('renders its given alt text', () => {
      const { container } = render(<Persona text="Kat Larrson" imageUrl={testImage1x1} imageAlt="ALT TEXT" />);
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', 'ALT TEXT');
    });
  });
});
