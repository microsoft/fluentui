import { Grid, Loader } from '@fluentui/react-northstar';
import * as React from 'react';

const LoaderExampleLabel: React.FC = () => (
  <Grid columns={2} variables={{ gridGap: '20px' }}>
    <Loader label="At start" labelPosition="start" />
    <Loader label="At end" labelPosition="end" />

    <Loader label="At above" labelPosition="above" />
    <Loader label="At below" labelPosition="below" />
  </Grid>
);

export default LoaderExampleLabel;
