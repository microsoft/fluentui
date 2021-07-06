import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PageRightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1029 256q-105 0-202 27t-183 77-154 119-119 155-77 182-28 203q0 105 27 202t77 183 119 154 155 119 182 77 203 28q105 0 202-27t183-77 154-119 119-155 77-182 28-203q0-105-27-202t-77-182-120-155-154-119-182-77-203-28zm0-128q123 0 236 32t213 90 180 139 140 181 90 212 32 237q0 123-32 236t-90 213-139 180-181 140-212 90-237 32q-123 0-236-32t-213-90-180-139-140-181-90-212-32-237q0-123 32-236t90-213 139-180 181-140 212-90 237-32zm-88 1357l-90-90 370-371-370-371 90-90 461 461-461 461z" />
    </svg>
  ),
  displayName: 'PageRightIcon',
});

export default PageRightIcon;
