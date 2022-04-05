import * as React from 'react';
import { Grid, Dropdown } from '@fluentui/react-northstar';

const inputItems = ['Robert Tolbert', 'Wanda Howard', 'Tim Deboer', 'Amanda Brady'];

const DropdownExamplePosition = () => (
  <Grid columns={1} variables={{ padding: '30px' }} styles={{ justifyItems: 'center' }}>
    <Dropdown items={inputItems} placeholder="Select your hero" offset={({ popper }) => [-popper.width / 2, 0]} />
  </Grid>
);

export default DropdownExamplePosition;
