import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RemoveFilterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 128h1792v1792H128V128zm1664 1664V256H256v1536h1536zM621 1517l-90-90 402-403-402-403 90-90 403 402 403-402 90 90-402 403 402 403-90 90-403-402-403 402z" />
    </svg>
  ),
  displayName: 'RemoveFilterIcon',
});

export default RemoveFilterIcon;
