import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TurnRightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1451 43q9 0 44 29t82 73 100 97 97 100 74 82 29 45q0 7-17 29t-44 53-64 70-74 76-76 74-69 63-53 45-29 17q-20 0-33-14t-14-35q0-3 4-21t10-43 13-55 15-56 12-47 7-28H725q-26 0-49 10t-40 28-28 41-11 49v1323H341V725q0-79 30-148t83-122 122-83 149-31h740l-7-28q-5-20-12-46t-14-56-14-55-10-44-4-22q0-20 13-33t34-14z" />
    </svg>
  ),
  displayName: 'TurnRightIcon',
});

export default TurnRightIcon;
