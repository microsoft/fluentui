import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-components';

export const DefaultOpen = () => (
  <Tooltip relationship="description" visible content="Default open tooltip">
    <Button>Default open</Button>
  </Tooltip>
);
