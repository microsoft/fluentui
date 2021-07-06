import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EntryDeclineIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M512 768h1024v128H512V768zm1024-256H512V384h1024v128zm-384 1408l127 128H256V0h1536v1348l-64 63-64-64V128H384v1792h768zm576 125l3 3h-6l3-3zm-192-893l-129 128H512v-128h1024zm-317 384l128 128H512v-128h707zm600 192l226 227-90 90-227-226-227 227-90-91 227-227-227-227 90-90 227 227 227-227 90 91-226 226z" />
    </svg>
  ),
  displayName: 'EntryDeclineIcon',
});

export default EntryDeclineIcon;
