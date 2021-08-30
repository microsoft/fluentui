import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Info2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 2048V512h256v1536H896zM896 0h256v256H896V0z" />
    </svg>
  ),
  displayName: 'Info2Icon',
});

export default Info2Icon;
