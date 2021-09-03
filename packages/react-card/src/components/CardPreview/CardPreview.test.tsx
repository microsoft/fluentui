import * as React from 'react';
import { render } from '@testing-library/react';
import { CardPreview } from './CardPreview';
import { isConformant } from '../../common/isConformant';

describe('CardPreview', () => {
  isConformant({
    Component: CardPreview,
    displayName: 'CardPreview',
  });

  it('renders a default state', () => {
    const result = render(<CardPreview logo={'Logo slot'}>Default CardPreview</CardPreview>);
    expect(result.container).toMatchSnapshot();
  });
});
