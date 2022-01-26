import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MaximumValueIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 512h128v896H0V512zm2048 0v896h-128V512h128zm-531 131l318 317-318 317-90-90 162-163H475l162 163-90 90-317-317 317-317 90 90-162 163h1114l-162-163 90-90z" />
    </svg>
  ),
  displayName: 'MaximumValueIcon',
});

export default MaximumValueIcon;
