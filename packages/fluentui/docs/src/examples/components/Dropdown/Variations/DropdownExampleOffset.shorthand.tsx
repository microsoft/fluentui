import * as React from 'react';
import { Grid, Dropdown } from '@fluentui/react-northstar';

const inputItems = ['Bruce Wayne', 'Natasha Romanoff', 'Steven Strange', 'Alfred Pennyworth'];

const DropdownExamplePosition = () => (
  <Grid columns="1" variables={{ padding: '30px' }} styles={{ justifyItems: 'center' }}>
    <Dropdown items={inputItems} placeholder="Select your hero" offset="-50%p" />
  </Grid>
);

export default DropdownExamplePosition;
