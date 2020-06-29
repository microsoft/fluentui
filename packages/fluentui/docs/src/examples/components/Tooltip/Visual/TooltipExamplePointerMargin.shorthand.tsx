import * as React from 'react';
import { Box, Grid, Tooltip } from '@fluentui/react-northstar';

const TooltipExamplePointerMargin = () => (
  <Grid columns={1} styles={{ margin: '200px', gridGap: '100px' }}>
    <Tooltip
      align="start"
      content="Sample tooltip"
      open
      pointing
      trigger={<Box styles={{ border: '2px solid green' }}>X</Box>}
    />
    <Tooltip
      align="center"
      content="Sample tooltip"
      open
      pointing
      trigger={<Box styles={{ border: '2px solid green' }}>X</Box>}
    />
    <Tooltip
      align="end"
      content="Sample tooltip"
      open
      pointing
      trigger={<Box styles={{ border: '2px solid green' }}>X</Box>}
    />

    <Tooltip
      align="start"
      content="Sample tooltip"
      open
      pointing
      position="below"
      trigger={<Box styles={{ border: '2px solid green' }}>X</Box>}
    />
    <Tooltip
      align="center"
      content="Sample tooltip"
      open
      pointing
      position="below"
      trigger={<Box styles={{ border: '2px solid green' }}>X</Box>}
    />
    <Tooltip
      align="end"
      content="Sample tooltip"
      open
      pointing
      position="below"
      trigger={<Box styles={{ border: '2px solid green' }}>X</Box>}
    />

    <Tooltip
      align="top"
      content="Sample tooltip"
      open
      pointing
      position="before"
      trigger={<Box styles={{ border: '2px solid green' }}>X</Box>}
    />
    <Tooltip
      align="center"
      content="Sample tooltip"
      open
      pointing
      position="before"
      trigger={<Box styles={{ border: '2px solid green' }}>X</Box>}
    />
    <Tooltip
      align="bottom"
      content="Sample tooltip"
      open
      pointing
      position="before"
      trigger={<Box styles={{ border: '2px solid green' }}>X</Box>}
    />

    <Tooltip
      align="top"
      content="Sample tooltip"
      open
      pointing
      position="after"
      trigger={<Box styles={{ border: '2px solid green' }}>X</Box>}
    />
    <Tooltip
      align="center"
      content="Sample tooltip"
      open
      pointing
      position="after"
      trigger={<Box styles={{ border: '2px solid green' }}>X</Box>}
    />
    <Tooltip
      align="bottom"
      content="Sample tooltip"
      open
      pointing
      position="after"
      trigger={<Box styles={{ border: '2px solid green' }}>X</Box>}
    />
  </Grid>
);

export default TooltipExamplePointerMargin;
