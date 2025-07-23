import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PersonaCoin } from './index';
import { setRTL } from '../../Utilities';
import { PersonaTestImages } from '../../common/TestImages';
import type { IPersonaCoinComponent } from './PersonaCoin.types';

const testPersonaCoinStyles: IPersonaCoinComponent['styles'] = {
  root: 'test-cn-root',
  image: 'test-cn-image',
  initials: 'test-cn-initials',
  presence: 'test-cn-presence',
};

// Views are just pure functions with no statefulness, which means they can get full code coverage
//    with snapshot tests exercising permutations of the props.
describe('PersonaCoin', () => {
  it('renders a correct persona', () => {
    const tree = renderer.create(<PersonaCoin text="James Bond" styles={testPersonaCoinStyles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a coin with the initials JB', () => {
    const tree = renderer.create(<PersonaCoin initials="JB" styles={testPersonaCoinStyles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a red coin', () => {
    const tree = renderer.create(<PersonaCoin initials="JB" styles={testPersonaCoinStyles} coinColor="red" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a coin with a contact icon', () => {
    const tree = renderer.create(<PersonaCoin styles={testPersonaCoinStyles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a coin with a contact icon for a Chinese name', () => {
    const tree = renderer.create(<PersonaCoin text="五号" styles={testPersonaCoinStyles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders presence when it is passed', () => {
    const tree = renderer.create(<PersonaCoin text="五号" presence={4} styles={testPersonaCoinStyles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders presence correctly when a very large coin is rendered', () => {
    const tree = renderer
      .create(<PersonaCoin text="五号" presence={4} styles={testPersonaCoinStyles} size={100} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the coin with the provided image', () => {
    const tree = renderer
      .create(<PersonaCoin text="Ellen Grace" imageUrl={PersonaTestImages.personMale} styles={testPersonaCoinStyles} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calculates an expected initials in LTR if one was not specified', () => {
    // Kat Larrson
    let { container } = render(<PersonaCoin text="Kat Larrson" styles={testPersonaCoinStyles} />);
    let textElement = container.querySelector(`.${testPersonaCoinStyles.initials}`);
    expect(textElement).toHaveTextContent('KL');

    // David Zearing-Goff
    ({ container } = render(<PersonaCoin text="David Zearing-Goff" styles={testPersonaCoinStyles} />));
    textElement = container.querySelector(`.${testPersonaCoinStyles.initials}`);
    expect(textElement).toHaveTextContent('DZ');

    // 4lex 5loo
    ({ container } = render(<PersonaCoin text="4lex 5loo" styles={testPersonaCoinStyles} />));
    textElement = container.querySelector(`.${testPersonaCoinStyles.initials}`);
    expect(textElement).toHaveTextContent('45');

    // Swapnil Vaibhav
    ({ container } = render(<PersonaCoin text="Swapnil Vaibhav" styles={testPersonaCoinStyles} />));
    textElement = container.querySelector(`.${testPersonaCoinStyles.initials}`);
    expect(textElement).toHaveTextContent('SV');

    // +1 (555) 6789
    ({ container } = render(<PersonaCoin text="+1 (555) 6789" styles={testPersonaCoinStyles} />));
    // For icons we need to check if the Contact icon is present
    const iconElement = container.querySelector('i');
    expect(iconElement?.getAttribute('data-icon-name')).toBe('Contact');

    // +1 (555) 6789 with phone initials allowed
    ({ container } = render(
      <PersonaCoin text="+1 (555) 6789" allowPhoneInitials={true} styles={testPersonaCoinStyles} />,
    ));
    textElement = container.querySelector(`.${testPersonaCoinStyles.initials}`);
    expect(textElement).toHaveTextContent('16');

    // David (The man) Goff
    ({ container } = render(<PersonaCoin text="David (The man) Goff" styles={testPersonaCoinStyles} />));
    textElement = container.querySelector(`.${testPersonaCoinStyles.initials}`);
    expect(textElement).toHaveTextContent('DG');
  });

  it('calculates an expected initials in RTL if one was not specified', () => {
    setRTL(true);

    const { container } = render(<PersonaCoin text="Kat Larrson" styles={testPersonaCoinStyles} />);
    const textElement = container.querySelector(`.${testPersonaCoinStyles.initials}`);
    expect(textElement).toHaveTextContent('LK');

    setRTL(false);
  });

  it('uses provided initial', () => {
    setRTL(true);
    const { container } = render(<PersonaCoin text="Kat Larrson" initials="AT" styles={testPersonaCoinStyles} />);
    const textElement = container.querySelector(`.${testPersonaCoinStyles.initials}`);
    expect(textElement).toHaveTextContent('AT');

    setRTL(false);
  });

  describe('image', () => {
    const testImage1x1 =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';

    it('renders empty alt text by default', () => {
      const { container } = render(
        <PersonaCoin text="Kat Larrson" imageUrl={testImage1x1} styles={testPersonaCoinStyles} />,
      );
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', '');
    });

    it('renders its given alt text', () => {
      const { container } = render(
        <PersonaCoin text="Kat Larrson" imageUrl={testImage1x1} imageAlt="ALT TEXT" styles={testPersonaCoinStyles} />,
      );
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', 'ALT TEXT');
    });
  });
});
