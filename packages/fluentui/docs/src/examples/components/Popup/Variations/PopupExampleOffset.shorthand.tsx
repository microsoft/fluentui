import * as React from 'react';
import { Button, Grid, Popup } from '@fluentui/react-northstar';
import { ArrowUpIcon } from '@fluentui/react-icons-northstar';

const PopupExampleOffset = () => (
  <Grid columns="1, 80px" variables={{ padding: '30px' }}>
    <Popup
      align="start"
      position="above"
      offset={({ popper }) => [-popper.width, 0]}
      trigger={
        <Button
          icon={
            <ArrowUpIcon
              {...{
                circular: true,
                bordered: true,
                rotate: -45,
              }}
            />
          }
          styles={{ height: '80px', minWidth: '80px', padding: 0 }}
          title="Show popup"
        />
      }
      content={
        <p>
          The popup is rendered at above-start
          <br />
          corner of the trigger.
        </p>
      }
    />
  </Grid>
);

export default PopupExampleOffset;
