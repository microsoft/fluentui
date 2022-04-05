import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RemoveContentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2045 1245l-355 355 355 355-90 90-355-355-355 355-90-90 355-355-355-355 90-90 355 355 355-355 90 90zM256 1792h864l-128 128H128V128h1792v864l-128 128V256H256v1536z" />
    </svg>
  ),
  displayName: 'RemoveContentIcon',
});

export default RemoveContentIcon;
