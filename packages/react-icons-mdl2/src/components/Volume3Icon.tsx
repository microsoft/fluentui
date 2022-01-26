import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Volume3Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1673 119q90 90 160 195t117 220 73 239 25 251q0 128-25 251t-72 239-118 220-160 195l-91-91q81-81 144-175t106-198 65-215 22-226q0-115-22-226t-65-214-106-198-144-176l91-91zm-9 905q0 180-68 343t-194 291l-91-91q109-109 167-249t58-294q0-154-58-294t-167-249l91-91q126 128 194 291t68 343zm-534-362q73 73 111 166t39 196q0 103-38 196t-112 166l-90-90q54-54 83-124t29-148q0-77-29-147t-83-125l90-90zM677 256h91v1536h-90l-385-384H0V640h293l384-384zm-37 219L347 768H128v512h219l293 293V475z" />
    </svg>
  ),
  displayName: 'Volume3Icon',
});

export default Volume3Icon;
