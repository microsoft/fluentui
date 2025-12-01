import * as React from 'react';
import { render } from '@testing-library/react';
import { setRTL } from '../../../Utilities';
import { PersonaCoin } from './PersonaCoin';
import { wrapPersona } from '../test-utils';

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
    const { container } = render(<PersonaCoin />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with text', () => {
    const { container } = render(<PersonaCoin text="Kat Larrson" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with provided initials', () => {
    const { container } = render(<PersonaCoin imageInitials="JG" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with image', () => {
    const { container } = render(<PersonaCoin text="Kat Larrson" imageUrl={testImage1x1} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the initials before the image is loaded', () => {
    const { container } = render(
      <PersonaCoin text="Kat Larrson" imageUrl={testImage1x1} showInitialsUntilImageLoads={true} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('does not render the initials when showInitialsUntilImageLoads is false', () => {
    const { container } = render(
      <PersonaCoin text="Kat Larrson" imageUrl={testImage1x1} showInitialsUntilImageLoads={false} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with onRender callback', () => {
    const { container } = render(
      <PersonaCoin {...coinProp} onRenderCoin={wrapPersona(coinProp)} onRenderInitials={wrapPersona(coinProp)} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
