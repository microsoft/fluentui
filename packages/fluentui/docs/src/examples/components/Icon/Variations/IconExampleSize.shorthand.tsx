import * as React from 'react';
import { Grid, Icon } from '@fluentui/react-northstar';

const IconExampleSize = () => (
  <Grid rows={2} styles={{ textAlign: 'center' }}>
    <Icon name="emoji" size="smallest" />
    <Icon name="call-video" size="smallest" />

    <Icon name="emoji" size="smaller" />
    <Icon name="call-video" size="smaller" />

    <Icon name="emoji" size="small" />
    <Icon name="call-video" size="small" />

    <Icon name="emoji" />
    <Icon name="call-video" />

    <Icon name="emoji" size="large" />
    <Icon name="call-video" size="large" />

    <Icon name="emoji" size="larger" />
    <Icon name="call-video" size="larger" />

    <Icon name="emoji" size="largest" />
    <Icon name="call-video" size="largest" />
  </Grid>
);

export default IconExampleSize;
