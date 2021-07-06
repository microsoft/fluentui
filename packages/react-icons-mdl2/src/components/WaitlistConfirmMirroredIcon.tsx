import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WaitlistConfirmMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1344 998l147-147 90 90-237 237-173-173 90-90 83 83zm-832 538h512v128H512v-128zm512-896H512V512h512v128zm0 512H512v-128h512v128zm557-723l-237 237-173-173 90-90 83 83 147-147 90 90zm-426 1491l128 128H256V0h1536v1283l-128 128V128H384v1792h771zm874-467l-557 558-269-270 90-90 179 178 467-466 90 90z" />
    </svg>
  ),
  displayName: 'WaitlistConfirmMirroredIcon',
});

export default WaitlistConfirmMirroredIcon;
