import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { omit } from '@fluentui/react-utilities';
import { Persona } from './Persona';
import { personaClassNames } from './usePersonaStyles.styles';
import { render, screen } from '@testing-library/react';

describe('Persona', () => {
  isConformant({
    Component: Persona,
    displayName: 'Persona',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            name: 'Kevin Sturgis',
            secondaryText: 'Software Engineer',
            tertiaryText: 'Seattle, WA',
            quaternaryText: 'Microsoft',
          },
          expectedClassNames: omit(personaClassNames, ['presence']),
        },
        {
          props: {
            presenceOnly: true,
            presence: { status: 'available' },
            name: 'Kevin Sturgis',
            secondaryText: 'Software Engineer',
            tertiaryText: 'Available',
            quaternaryText: 'Microsoft',
          },
          expectedClassNames: omit(personaClassNames, ['avatar']),
        },
      ],
    },
  });

  it('passes name to primaryText if no primaryText is provided', () => {
    render(<Persona name="Kevin Sturgis" />);
    expect(screen.queryByText('Kevin Sturgis')).toBeTruthy();
  });

  it('ignores name when primaryText is provided', () => {
    render(<Persona name="Kevin Sturgis" primaryText="Custom Primary Text" />);
    expect(screen.queryByText('Kevin Sturgis')).toBeFalsy();
    expect(screen.queryByText('Custom Primary Text')).toBeTruthy();
  });
});
