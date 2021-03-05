import * as React from 'react';
import { Flex, Grid, Text } from '@fluentui/react-northstar';
import { CalendarIcon, CallIcon, CallVideoIcon } from '@fluentui/react-icons-northstar';

const SvgIconExampleColor = () => (
  <Grid
    columns="repeat(4, auto)"
    styles={{
      alignItems: 'center',
    }}
    variables={{
      gridGap: '10px',
    }}
  >
    <Text content="INHERITED COLOR:" weight="bold" />
    <Flex
      gap="gap.smaller"
      styles={({ theme: { siteVariables } }) => ({
        color: siteVariables.colorScheme.brand.foreground,
      })}
    >
      <CalendarIcon bordered />
      <CallIcon bordered />
      <CallVideoIcon bordered />
    </Flex>
    <Text content="INHERITED COLOR FOR OUTLINED ICONS:" weight="bold" />
    <Flex
      gap="gap.smaller"
      styles={({ theme: { siteVariables } }) => ({
        color: siteVariables.colorScheme.brand.foreground,
      })}
    >
      <CalendarIcon bordered outline />
      <CallIcon bordered outline />
      <CallVideoIcon bordered outline />
    </Flex>
  </Grid>
);

export default SvgIconExampleColor;
