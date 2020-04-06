import { Grid, Loader } from '@fluentui/react-northstar';
import * as React from 'react';

const LoaderExampleSize: React.FC = () => (
  <Grid columns="4" variables={{ gridGap: '20px' }}>
    <Loader size="smallest" label="smallest" labelPosition="below" />
    <Loader size="smaller" label="smaller" labelPosition="below" />
    <Loader size="small" label="small" labelPosition="below" />

    <Loader label="medium (default)" labelPosition="below" />

    <Loader size="large" label="large" labelPosition="below" />
    <Loader size="larger" label="larger" labelPosition="below" />
    <Loader size="largest" label="largest" labelPosition="below" />
  </Grid>
);

export default LoaderExampleSize;
