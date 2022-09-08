import * as React from 'react';
import { render } from '@testing-library/react';
import { PersonaPresenceBadge } from './PersonaPresenceBadge';
import { isConformant } from '../../common/isConformant';

describe('PersonaPresenceBadge', () => {
  isConformant({
    Component: PersonaPresenceBadge,
    displayName: 'PersonaPresenceBadge',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<PersonaPresenceBadge>Default PersonaPresenceBadge</PersonaPresenceBadge>);
    expect(result.container).toMatchSnapshot();
  });
});
