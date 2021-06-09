import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MinimumValueIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 512h128v896h-128V512zm-256 0h128v896H768V512zm1152 512h-421l162 163-90 90-317-317 317-317 90 90-162 163h421v128zM349 643l317 317-317 317-90-90 162-163H0V896h421L259 733l90-90z" />
    </svg>
  ),
  displayName: 'MinimumValueIcon',
});

export default MinimumValueIcon;
