import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ActivityFeedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 1088V768H0V128h1664v640H448l-320 320zm0-448h128v139l139-139h1141V256H128v384zm1920 384v640h-128v320l-320-320H384v-640h1664zm-128 128H512v384h1141l139 139v-139h128v-384z" />
    </svg>
  ),
  displayName: 'ActivityFeedIcon',
});

export default ActivityFeedIcon;
