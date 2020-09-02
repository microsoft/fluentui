import * as React from 'react';
import { Grid } from '@fluentui/react-northstar';
import { EmojiIcon, CallVideoIcon } from '@fluentui/react-icons-northstar';

const SvgIconExampleSize = () => (
  <Grid rows={2} styles={{ textAlign: 'center' }}>
    <EmojiIcon size="smallest" />
    <CallVideoIcon size="smallest" />

    <EmojiIcon size="smaller" />
    <CallVideoIcon size="smaller" />

    <EmojiIcon size="small" />
    <CallVideoIcon size="small" />

    <EmojiIcon />
    <CallVideoIcon />

    <EmojiIcon size="large" />
    <CallVideoIcon size="large" />

    <EmojiIcon size="larger" />
    <CallVideoIcon size="larger" />

    <EmojiIcon size="largest" />
    <CallVideoIcon size="largest" />
  </Grid>
);

export default SvgIconExampleSize;
