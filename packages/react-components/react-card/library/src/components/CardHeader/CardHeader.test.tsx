import * as React from 'react';
import { render } from '@testing-library/react';
import { CardHeader } from './CardHeader';
import { isConformant } from '../../testing/isConformant';

describe('CardHeader', () => {
  isConformant({
    Component: CardHeader,
    displayName: 'CardHeader',
    testOptions: {
      'has-static-classnames': [
        {
          props: { image: 'Image Test', header: 'Header Test', description: 'Description Test', action: 'Action Test' },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(
      <CardHeader image={'Image slot'} header="Title slot" description="Description slot" action={'Action slot'} />,
    );
    expect(result.container).toMatchSnapshot();
  });
});

describe('CardHeader DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <CardHeader action={<button />} description="Description" header="Header" image={<img alt="" />} />,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });
});
