import * as React from 'react';
import { isConformant } from '../../common/isConformant';
import { Persona } from './Persona';
import { personaClassNames } from './usePersonaStyles';
import { render, screen } from '@testing-library/react';

describe('Persona', () => {
  isConformant({
    Component: Persona,
    displayName: 'Persona',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            presence: { status: 'available' },
            name: 'Kevin Sturgis',
            secondaryText: 'Software Engineer',
            tertiaryText: 'Seattle, WA',
            quaternaryText: 'Available at 4:00pm',
          },
          expectedClassNames: {
            root: personaClassNames.root,
            avatar: personaClassNames.avatar,
            presence: personaClassNames.presence,
            primaryText: personaClassNames.primaryText,
            secondaryText: personaClassNames.secondaryText,
            tertiaryText: personaClassNames.tertiaryText,
            quaternaryText: personaClassNames.quaternaryText,
          },
        },
        {
          props: {
            name: 'Kevin Sturgis',
            secondaryText: 'Software Engineer',
            tertiaryText: 'Seattle, WA',
          },
          expectedClassNames: {
            root: personaClassNames.root,
            avatar: personaClassNames.avatar,
            primaryText: personaClassNames.primaryText,
            secondaryText: personaClassNames.secondaryText,
            tertiaryText: personaClassNames.tertiaryText,
          },
        },
        {
          props: {
            presenceOnly: true,
            presence: { status: 'available' },
            name: 'Kevin Sturgis',
            secondaryText: 'Software Engineer',
          },
          expectedClassNames: {
            root: personaClassNames.root,
            presence: personaClassNames.presence,
            primaryText: personaClassNames.primaryText,
            secondaryText: personaClassNames.secondaryText,
          },
        },
      ],
    },
  });

  it('passes name to primaryText if no primaryText is provided', () => {
    render(<Persona name="Kevin Sturgis" />);
    expect(screen.queryByText('Kevin Sturgis')).toBeTruthy();
  });

  it('uses ignores name when primaryText is provided', () => {
    render(<Persona name="Kevin Sturgis" primaryText="Custom Primary Text" />);
    expect(screen.queryByText('Kevin Sturgis')).toBeFalsy();
    expect(screen.queryByText('Custom Primary Text')).toBeTruthy();
  });
});
