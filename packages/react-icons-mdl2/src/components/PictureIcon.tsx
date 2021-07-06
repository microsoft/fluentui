import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PictureIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 512h256v1280H256v-256H0V256h1792v256zM128 384v1024h1536V384H128zm1792 1280V640h-128v896H384v128h1536zM256 1280V512h1280v768H256zm128-640v512h1024V640H384z" />
    </svg>
  ),
  displayName: 'PictureIcon',
});

export default PictureIcon;
