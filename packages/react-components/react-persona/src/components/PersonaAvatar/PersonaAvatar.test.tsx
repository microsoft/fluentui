import * as React from 'react';
import { render } from '@testing-library/react';
import { PersonaAvatar } from './PersonaAvatar';
import { isConformant } from '../../common/isConformant';

describe('PersonaAvatar', () => {
  isConformant({
    Component: PersonaAvatar,
    displayName: 'PersonaAvatar',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<PersonaAvatar>Default PersonaAvatar</PersonaAvatar>);
    expect(result.container).toMatchSnapshot();
  });
});
