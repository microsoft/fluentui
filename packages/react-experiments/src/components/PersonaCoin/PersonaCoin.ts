import * as React from 'react';
import { createComponent } from '@fluentui/foundation-legacy';
import { usePersonaCoinState } from './PersonaCoin.state';
import { PersonaCoinStyles } from './PersonaCoin.styles';
import { PersonaCoinView } from './PersonaCoin.view';
import type { IPersonaCoinProps } from './PersonaCoin.types';

export const PersonaCoin: React.FunctionComponent<IPersonaCoinProps> = createComponent(PersonaCoinView, {
  displayName: 'PersonaCoin',
  styles: PersonaCoinStyles,
  state: usePersonaCoinState,
});
