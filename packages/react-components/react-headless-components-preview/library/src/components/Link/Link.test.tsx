import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Link } from './Link';

describe('Link', () => {
  isConformant({
    Component: Link,
    displayName: 'Link',
  });

  it('renders a default state', () => {
    const result = render(<Link>Default Link</Link>);
    expect(result.container).toMatchSnapshot();
  });
});
