import * as React from 'react';
import { Grid, TextArea } from '@fluentui/react-northstar';

const TextAreaExampleInverted = () => (
  <div>
    <Grid
      styles={({ theme: { siteVariables } }) => ({
        backgroundColor: siteVariables.colorScheme.default.background2,
        padding: '20px',
      })}
    >
      <TextArea inverted placeholder="Inverted color text area..." />
    </Grid>
    <Grid
      styles={({ theme: { siteVariables } }) => ({
        backgroundColor: siteVariables.colorScheme.default.background,
        padding: '20px',
      })}
    >
      <TextArea placeholder="Default text area..." />
    </Grid>
  </div>
);

export default TextAreaExampleInverted;
