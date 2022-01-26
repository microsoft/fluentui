import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const InboxCheckIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M832 794L467 429l90-90 275 275 531-531 90 90-621 621zm1088 482q1 2 1 29t1 69 0 97 0 111-1 114 0 102-1 79 0 43H0v-42-79q0-47-1-103t0-113-1-112 0-96 0-70 2-29l238-714 101 102-205 616h418l128 256h560l128-256h418l-269-809 101-101 302 906zm-128 132h-344l-128 256H600l-128-256H128v384h1664v-384z" />
    </svg>
  ),
  displayName: 'InboxCheckIcon',
});

export default InboxCheckIcon;
