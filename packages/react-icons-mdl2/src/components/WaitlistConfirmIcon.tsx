import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WaitlistConfirmIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 640h-512V512h512v128zm-512 384h512v128h-512v-128zm131 896l128 128H256V0h1536v1283l-128 128V128H384v1792h771zM941 429L704 666 531 493l90-90 83 83 147-147 90 90zm0 512l-237 237-173-173 90-90 83 83 147-147 90 90zm-237 569l147-147 90 90-237 237-173-173 90-90 83 83zm1325-57l-557 558-269-270 90-90 179 178 467-466 90 90z" />
    </svg>
  ),
  displayName: 'WaitlistConfirmIcon',
});

export default WaitlistConfirmIcon;
