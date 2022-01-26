import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DeleteRowsMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1150 128h896V0H1022v512h128V128zM635 960l320 320h1091V640H954L635 960zm515 448h-128v512h1024v-128h-896v-384zM91 1277l227-227 227 227 90-90-227-227 227-227-91-90-226 226L91 643 1 733l226 227L0 1187l91 90z" />
    </svg>
  ),
  displayName: 'DeleteRowsMirroredIcon',
});

export default DeleteRowsMirroredIcon;
