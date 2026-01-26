import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MessageBarTitle } from './MessageBarTitle';

describe('MessageBarTitle', () => {
  isConformant({
    Component: MessageBarTitle,
    displayName: 'MessageBarTitle',
  });

  it('renders a default state', () => {
    const result = render(<MessageBarTitle>Default MessageBarTitle</MessageBarTitle>);
    expect(result.container).toMatchSnapshot();
  });

  it('renders correctly with different as values', () => {
    const { container: containerH1 } = render(<MessageBarTitle as="h1">MessageBarTitle as h1</MessageBarTitle>);
    expect(containerH1).toMatchSnapshot();

    const { container: containerH2 } = render(<MessageBarTitle as="h2">MessageBarTitle as h2</MessageBarTitle>);
    expect(containerH2).toMatchSnapshot();

    const { container: containerH3 } = render(<MessageBarTitle as="h3">MessageBarTitle as h3</MessageBarTitle>);
    expect(containerH3).toMatchSnapshot();

    const { container: containerH4 } = render(<MessageBarTitle as="h4">MessageBarTitle as h4</MessageBarTitle>);
    expect(containerH4).toMatchSnapshot();

    const { container: containerH5 } = render(<MessageBarTitle as="h5">MessageBarTitle as h5</MessageBarTitle>);
    expect(containerH5).toMatchSnapshot();

    const { container: containerH6 } = render(<MessageBarTitle as="h6">MessageBarTitle as h6</MessageBarTitle>);
    expect(containerH6).toMatchSnapshot();

    const { container: containerP } = render(<MessageBarTitle as="p">MessageBarTitle as p</MessageBarTitle>);
    expect(containerP).toMatchSnapshot();
  });
});
