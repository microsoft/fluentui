import * as React from 'react'
import { Animation, Icon, Grid, Text, Provider } from '@fluentui/react'

const colorChanger = {
  keyframe: {
    from: { color: 'red' },
    to: { color: 'blue' },
  },
  duration: '3s',
  iterationCount: 'infinite',
}

const AnimationExampleFillMode = () => (
  <Provider theme={{ animations: { colorChanger } }}>
    <Grid columns={4}>
      <Text content="None" />
      <Text content="Forwards" />
      <Text content="Backwards" />
      <Text content="Both" />
      <div>
        <Animation name="colorChanger" fillMode="none" delay="3s" iterationCount="1">
          <Icon name="mention" circular bordered />
        </Animation>
      </div>
      <div>
        <Animation name="colorChanger" fillMode="forwards" delay="3s" iterationCount="1">
          <Icon name="mention" circular bordered />
        </Animation>
      </div>
      <div>
        <Animation name="colorChanger" fillMode="backwards" delay="3s" iterationCount="1">
          <Icon name="mention" circular bordered />
        </Animation>
      </div>
      <div>
        <Animation name="colorChanger" fillMode="both" delay="3s" iterationCount="1">
          <Icon name="mention" circular bordered />
        </Animation>
      </div>
    </Grid>
  </Provider>
)

export default AnimationExampleFillMode
