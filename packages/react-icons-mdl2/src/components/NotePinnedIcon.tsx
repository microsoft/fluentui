import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NotePinnedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1271q61 27 128 36v613H677l-549-549V128h1792v229q-67 9-128 36V256H256v1024h512v512h1024v-521zM640 1408H347l293 293v-293zm1408-896v640h-64q-78 0-143-33t-112-95h-110q-28 59-70 106t-94 81-113 51-126 18h-64V896H640l-128-64 128-64h512V384h64q65 0 125 18t113 51 95 80 70 107h110q47-61 112-94t143-34h64zm-128 139q-24 8-41 20t-30 26-25 33-24 38h-269l-15-43q-28-79-91-134t-145-72v626q82-17 145-72t91-134l15-43h269q12 20 23 38t25 32 31 27 41 20V651z" />
    </svg>
  ),
  displayName: 'NotePinnedIcon',
});

export default NotePinnedIcon;
