import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StoryboardIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1664H0V128h2048zM128 256v256h1792V256H128zm0 1408h1024V640H128v1024zm1792 0V640h-640v1024h640zm-512-896h384v128h-384V768zm0 256h384v128h-384v-128zm0 256h384v128h-384v-128zm-384-512v768H256V768h768zM896 896H384v512h512V896z" />
    </svg>
  ),
  displayName: 'StoryboardIcon',
});

export default StoryboardIcon;
