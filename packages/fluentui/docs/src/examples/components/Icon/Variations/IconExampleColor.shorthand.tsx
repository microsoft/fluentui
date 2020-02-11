import * as React from 'react'
import * as _ from 'lodash'
import { Flex, Icon, Grid, Text, ProviderConsumer } from '@fluentui/react'

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
      <Icon name="calendar" bordered />
      <Icon name="call" bordered />
      <Icon name="call-video" bordered />
    </Flex>
    <Text content="INHERITED COLOR FOR OUTLINED ICONS:" weight="bold" />
    <Flex
      gap="gap.smaller"
      styles={({ theme: { siteVariables } }) => ({
        color: siteVariables.colorScheme.brand.foreground,
      })}
    >
      <Icon name="calendar" bordered outline />
      <Icon name="call" bordered outline />
      <Icon name="call-video" bordered outline />
    </Flex>
    <Text weight="bold">
      USING THE <code>color</code> PROP:
    </Text>
    <Flex gap="gap.smaller">
      <ProviderConsumer
        render={({ siteVariables: { contextualColors, naturalColors } }) =>
          _.keys({ ...contextualColors, ...naturalColors }).map(color => (
            <Icon color={color} name="calendar" title={color} key={color} />
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
            <Icon color={color} name="calendar" outline title={color} key={color} />
          ))
        }
      />
    </Flex>
    <Text weight="bold" size="small" content={'*hover the icons to see the color prop value'} />
  </Grid>
)

export default IconExampleColor
