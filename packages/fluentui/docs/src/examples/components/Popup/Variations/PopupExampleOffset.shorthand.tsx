import * as React from 'react'
import { Button, Grid, Popup } from '@fluentui/react'

const renderButton = () => (
  <Button
    icon={{
      name: 'arrow-up',
      circular: true,
      bordered: true,
      rotate: -45,
    }}
    styles={{ height: '80px', minWidth: '80px', padding: 0 }}
    title="Show popup"
  />
)

const PopupExamplePosition = () => (
  <Grid columns="1, 80px" variables={{ padding: '30px' }}>
    <Popup
      align="start"
      position="above"
      offset="-100%p"
      trigger={renderButton()}
      content={
        <p>
          The popup is rendered at above-start
          <br />
          corner of the trigger.
        </p>
      }
      key="above-start"
    />
  </Grid>
)

export default PopupExamplePosition
