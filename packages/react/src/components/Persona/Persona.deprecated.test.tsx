import '@testing-library/jest-dom';
import * as React from 'react';
import { create } from '@fluentui/test-utilities';
import { setRTL, setWarningCallback } from '@fluentui/utilities';
import { Persona } from './Persona';
import { render, screen } from '@testing-library/react';
import { getIcon } from '../../Styling';

const testImage1x1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';
// NOTES: The following styles have been used with enzyme previously, keeping here for reference.
// const STYLES = {
//   green: '.ms-Persona-initials--green',
//   initials: '.ms-Persona-initials',
//   black: '.ms-Persona-initials--black',
//   red: '.ms-Persona-initials--red',
// };

describe('Persona', () => {
  beforeEach(() => {
    setRTL(false);
  });

  beforeAll(() => {
    // Prevent warn deprecations from failing test
    setWarningCallback(() => {
      /* no-op */
    });
  });

  afterAll(() => {
    setWarningCallback();
  });

  it('renders Persona correctly with no props', () => {
    const component = create(<Persona />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona correctly with initials', () => {
    const component = create(<Persona primaryText="Kat Larrson" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona correctly with image', () => {
    const component = create(<Persona primaryText="Kat Larrson" imageUrl={testImage1x1} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('initials and colors', () => {
    it('calculates an expected initials in LTR if one was not specified', () => {
      render(<Persona primaryText="Kat Larrson" />);
      const initials = screen.getByText('KL');
      expect(initials).toBeInTheDocument();

      render(<Persona primaryText="David Zearing-Goff" />);
      const initialsDZ = screen.getByText('DZ');
      expect(initialsDZ).toBeInTheDocument();

      render(<Persona primaryText="4lex 5loo" />);
      const initials45 = screen.getByText('45');
      expect(initials45).toBeInTheDocument();

      render(<Persona primaryText="+1 (555) 6789" />);
      const contactIcon = screen.getByText(getIcon('contact')!.code as string);
      expect(contactIcon).toBeInTheDocument();

      render(<Persona primaryText="+1 (555) 6789" allowPhoneInitials={true} />);
      const phoneInitials = screen.getByText('16');
      expect(phoneInitials).toBeInTheDocument();

      render(<Persona primaryText="David (The man) Goff" />);
      const initialsDG = screen.getByText('DG');
      expect(initialsDG).toBeInTheDocument();
    });

    it('calculates an expected initials in RTL if one was not specified', () => {
      setRTL(true);
      render(<Persona primaryText="Kat Larrson" />);
      const initials = screen.getByText('LK');
      expect(initials).toBeInTheDocument();
      setRTL(false);
    });

    it('uses provided initial', () => {
      setRTL(true);
      render(<Persona primaryText="Kat Larrson" imageInitials="AT" />);
      const initials = screen.getByText('AT');
      expect(initials).toBeInTheDocument();
      setRTL(false);
    });
  });

  describe('image', () => {
    it('renders empty alt text by default', () => {
      const { container } = render(<Persona primaryText="Kat Larrson" imageUrl={testImage1x1} />);
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', '');
    });

    it('renders its given alt text', () => {
      const { container } = render(<Persona primaryText="Kat Larrson" imageUrl={testImage1x1} imageAlt="ALT TEXT" />);
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', 'ALT TEXT');
    });
  });
});
