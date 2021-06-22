import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Volume1Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1130 662q73 73 111 166t39 196q0 103-38 196t-112 166l-90-90q54-54 83-124t29-148q0-77-29-147t-83-125l90-90zM677 256h91v1536h-90l-385-384H0V640h293l384-384zm-37 219L347 768H128v512h219l293 293V475z" />
    </svg>
  ),
  displayName: 'Volume1Icon',
});

export default Volume1Icon;
