import * as React from 'react';
import { Dropdown, Grid } from '@fluentui/react-northstar';

const inputItems = [
  'Robert Tolbert',
  'Wanda Howard',
  'Tim Deboer',
  'Amanda Brady',
  'Ashley McCarthy',
  'Cameron Evans',
  'Carlos Slattery',
  'Carole Poland',
  'Robin Counts',
];

const DropdownExampleInverted = () => (
  <div>
    <Grid
      styles={({ theme: { siteVariables } }) => ({
        backgroundColor: siteVariables.colorScheme.default.background2,
        padding: '20px',
      })}
    >
      <Dropdown inverted items={inputItems} placeholder="Select your hero" />
    </Grid>
  </div>
);

export default DropdownExampleInverted;
