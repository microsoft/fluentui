import * as React from 'react';
import { Box, Grid, Popup } from '@fluentui/react-northstar';

const PopupExamplePointerMargin = () => (
  <Grid columns={1} styles={{ margin: '200px', gridGap: '100px' }}>
    <Popup
      align="start"
      content="Sample popup"
      open
      pointing
      trigger={
        <Box role="button" styles={{ border: '2px solid green' }}>
          X
        </Box>
      }
    />
    <Popup
      align="center"
      content="Sample popup"
      open
      pointing
      trigger={
        <Box role="button" styles={{ border: '2px solid green' }}>
          X
        </Box>
      }
    />
    <Popup
      align="end"
      content="Sample popup"
      open
      pointing
      trigger={
        <Box role="button" styles={{ border: '2px solid green' }}>
          X
        </Box>
      }
    />

    <Popup
      align="start"
      content="Sample popup"
      open
      pointing
      position="below"
      trigger={
        <Box role="button" styles={{ border: '2px solid green' }}>
          X
        </Box>
      }
    />
    <Popup
      align="center"
      content="Sample popup"
      open
      pointing
      position="below"
      trigger={
        <Box role="button" styles={{ border: '2px solid green' }}>
          X
        </Box>
      }
    />
    <Popup
      align="end"
      content="Sample popup"
      open
      pointing
      position="below"
      trigger={
        <Box role="button" styles={{ border: '2px solid green' }}>
          X
        </Box>
      }
    />

    <Popup
      align="top"
      content="Sample popup"
      open
      pointing
      position="before"
      trigger={
        <Box role="button" styles={{ border: '2px solid green' }}>
          X
        </Box>
      }
    />
    <Popup
      align="center"
      content="Sample popup"
      open
      pointing
      position="before"
      trigger={
        <Box role="button" styles={{ border: '2px solid green' }}>
          X
        </Box>
      }
    />
    <Popup
      align="bottom"
      content="Sample popup"
      open
      pointing
      position="before"
      trigger={
        <Box role="button" styles={{ border: '2px solid green' }}>
          X
        </Box>
      }
    />

    <Popup
      align="top"
      content="Sample popup"
      open
      pointing
      position="after"
      trigger={
        <Box role="button" styles={{ border: '2px solid green' }}>
          X
        </Box>
      }
    />
    <Popup
      align="center"
      content="Sample popup"
      open
      pointing
      position="after"
      trigger={
        <Box role="button" styles={{ border: '2px solid green' }}>
          X
        </Box>
      }
    />
    <Popup
      align="bottom"
      content="Sample popup"
      open
      pointing
      position="after"
      trigger={
        <Box role="button" styles={{ border: '2px solid green' }}>
          X
        </Box>
      }
    />
  </Grid>
);

export default PopupExamplePointerMargin;
