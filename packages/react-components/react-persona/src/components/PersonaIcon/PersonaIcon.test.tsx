import * as React from 'react';
import { render } from '@testing-library/react';
import { PersonaIcon } from './PersonaIcon';
import { isConformant } from '../../common/isConformant';

describe('PersonaIcon', () => {
  isConformant({
    Component: PersonaIcon,
    displayName: 'PersonaIcon',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<PersonaIcon>Default PersonaIcon</PersonaIcon>);
    expect(result.container).toMatchSnapshot();
  });
});
