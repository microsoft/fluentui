import { Button, Grid, Popup, Provider } from '@fluentui/react-northstar';
import * as React from 'react';

const PopupExamplePointerOffset = () => (
  <>
    <Grid columns={1} styles={{ gridGap: '50px', margin: '200px' }}>
      <Popup
        align="center"
        position="above"
        offset={[50, 0]}
        open
        pointing
        trigger={<Button>Click</Button>}
        content={
          <p>
            The popup is rendered at above-start
            <br />
            corner of the trigger.
          </p>
        }
      />

      <Popup
        align="center"
        position="above"
        offset={({ popper }) => [-popper.height, -popper.height]}
        open
        trigger={<Button>Click</Button>}
        content={
          <p>
            The popup is rendered at above-start
            <br />
            corner of the trigger.
          </p>
        }
      />
    </Grid>
    <Provider rtl>
      <Grid columns={1} styles={{ gridGap: '50px', margin: '200px' }}>
        <Popup
          align="center"
          position="above"
          offset={[50, 0]}
          open
          pointing
          trigger={<Button>Click</Button>}
          content={
            <p>
              The popup is rendered at above-start
              <br />
              corner of the trigger.
            </p>
          }
        />

        <Popup
          align="center"
          position="above"
          offset={({ popper }) => [-popper.height, -popper.height]}
          open
          trigger={<Button>Click</Button>}
          content={
            <p>
              The popup is rendered at above-start
              <br />
              corner of the trigger.
            </p>
          }
        />
      </Grid>
    </Provider>
  </>
);

export default PopupExamplePointerOffset;
