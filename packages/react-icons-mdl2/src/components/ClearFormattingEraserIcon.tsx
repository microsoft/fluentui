import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ClearFormattingEraserIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M704 1434l422 422-65 64H731l-211-211q-19-19-19-45t19-45l184-185zm640-640l422 422-550 550-422-422 550-550z" />
    </svg>
  ),
  displayName: 'ClearFormattingEraserIcon',
});

export default ClearFormattingEraserIcon;
