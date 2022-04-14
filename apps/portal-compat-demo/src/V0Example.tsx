import {
  Button as V0Button,
  Dialog as V0Dialog,
  Provider as V0Provider,
  teamsTheme as v0LightTheme,
  teamsHighContrastTheme as v0HCTheme,
} from '@fluentui/react-northstar';
import { Button as V9Button } from '@fluentui/react-components';
import * as React from 'react';

export const V0Example: React.FC<{ isHC: boolean }> = props => (
  <V0Provider theme={props.isHC ? v0HCTheme : v0LightTheme} style={{ margin: 50 }}>
    <V0Dialog
      content={
        <div style={{ display: 'flex', gap: 20, flexDirection: 'column' }}>
          <V0Button primary>v0 button</V0Button>
          <V9Button appearance="primary">v9 button</V9Button>
        </div>
      }
      header="Action confirmation"
      trigger={<V9Button>Open V0 dialog</V9Button>}
    />
  </V0Provider>
);
