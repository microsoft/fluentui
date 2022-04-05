import * as React from 'react';
import { Grid, Input } from '@fluentui/react-northstar';

const InputExample = () => (
  <div>
    <Grid
      styles={({ theme: { siteVariables } }) => ({
        backgroundColor: siteVariables.colorScheme.default.background2,
        padding: '20px',
      })}
    >
      <Input inverted placeholder="Inverted color input..." />
    </Grid>
    <Grid
      styles={({ theme: { siteVariables } }) => ({
        backgroundColor: siteVariables.colorScheme.default.background,
        padding: '20px',
      })}
    >
      <Input placeholder="Default input..." />
    </Grid>
  </div>
);

export default InputExample;
