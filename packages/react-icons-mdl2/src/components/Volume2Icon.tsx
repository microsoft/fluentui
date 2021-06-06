import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Volume2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1402 390q126 128 194 291t68 343q0 180-68 343t-194 291l-91-91q109-109 167-249t58-294q0-154-58-294t-167-249l91-91zm-272 272q73 73 111 166t39 196q0 103-38 196t-112 166l-90-90q54-54 83-124t29-148q0-77-29-147t-83-125l90-90zM677 256h91v1536h-90l-385-384H0V640h293l384-384zm-37 219L347 768H128v512h219l293 293V475z" />
    </svg>
  ),
  displayName: 'Volume2Icon',
});

export default Volume2Icon;
