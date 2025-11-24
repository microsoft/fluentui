import * as React from 'react';
import { render } from '@testing-library/react';
import { KeytipContent } from './KeytipContent';

const sequence: string[] = ['a'];
const keyCont = 'A';

describe('Keytip', () => {
  it('renders visible Keytip correctly', () => {
    const { container } = render(<KeytipContent visible={true} content={keyCont} keySequences={sequence} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders visible disabled Keytip correctly', () => {
    const { container } = render(
      <KeytipContent visible={true} disabled={true} content={keyCont} keySequences={sequence} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders invisible Keytip correctly', () => {
    const { container } = render(<KeytipContent visible={false} content={keyCont} keySequences={sequence} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
