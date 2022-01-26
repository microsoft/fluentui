import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ExternalXAMLIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 256H256v1664H128V128h1792v1024h-128V256zm-137 1408l-220 384H997l-220-384 220-384h438l220 384zm361 0l-219 384h-148l220-384-220-384h148l219 384zm-1453 0l220 384H635l-219-384 219-384h148l-220 384z" />
    </svg>
  ),
  displayName: 'ExternalXAMLIcon',
});

export default ExternalXAMLIcon;
