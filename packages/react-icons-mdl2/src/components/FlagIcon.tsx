import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FlagIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 256v1024h-896v-256H384v1024H256V0h896v256h768zm-896 640V128H384v768h640zm768-512h-640v768h640V384z" />
    </svg>
  ),
  displayName: 'FlagIcon',
});

export default FlagIcon;
