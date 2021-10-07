import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GitLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0q25 0 49 11t42 28l894 894q20 20 29 45t10 52q0 26-11 49t-28 40l-890 890q-39 39-95 39-25 0-49-11t-42-28L39 1115q-17-17-28-41t-11-50q0-26 10-51t29-44l613-613 232 232q-12 29-12 61 0 64 46 110l8 8q2 2 5 3t6 1 10 4v567q-12 5-20 14t-18 18q-26 26-41 55t-15 67q0 34 13 63t35 52 52 35 64 13q34 0 65-11t53-31 36-50 14-65q0-22-6-44t-18-41-28-36-35-27V763l212 212q-12 29-12 60 0 33 12 61t34 50 49 33 62 13q33 0 61-12t50-34 33-49 13-62q0-32-12-60t-34-50-49-34-61-13q-27 0-52 9l-227-227q9-25 9-52 0-33-12-61t-34-50-49-33-62-12q-24 0-50 8L743 224 929 39q39-39 95-39z" />
    </svg>
  ),
  displayName: 'GitLogoIcon',
});

export default GitLogoIcon;
