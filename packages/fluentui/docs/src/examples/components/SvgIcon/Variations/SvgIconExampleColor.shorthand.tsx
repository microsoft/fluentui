import * as React from 'react';
import * as _ from 'lodash';
import { Flex, Grid, Text, ProviderConsumer } from '@fluentui/react-northstar';
import { CalendarIcon, CallIcon, CallVideoIcon } from '@fluentui/react-icons-northstar';

const IconExampleColor = () => (
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
    <Text weight="bold">
      USING THE <code>color</code> PROP:
    </Text>
    <Flex gap="gap.smaller">
      <ProviderConsumer
        render={({ siteVariables: { contextualColors, naturalColors } }) =>
          _.keys({ ...contextualColors, ...naturalColors }).map(color => (
            <CalendarIcon color={color} title={color} key={color} />
          ))
        }
      />
    </Flex>
    <Text weight="bold">
      USING THE <code>color</code> PROP WITH OUTLINED ICONS:
    </Text>
    <Flex gap="gap.smaller">
      <ProviderConsumer
        render={({ siteVariables: { contextualColors, naturalColors } }) =>
          _.keys({ ...contextualColors, ...naturalColors }).map(color => (
            <CalendarIcon color={color} outline title={color} key={color} />
          ))
        }
      />
    </Flex>
    <Text weight="bold" size="small" content={'*hover the icons to see the color prop value'} />
  </Grid>
);

export default IconExampleColor;
