import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PhotoVideoMediaIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 512h128v128H256V512zm0 256h128v128H256V768zm1024-128h-128V512h128v128zm768 128v1152H512v-640H0V128h1536v640h512zm-128 128H640v549l320-319 448 447 320-319 192 191V896zM512 1152V768h896V256h-128v128h-128V256H384v128H256V256H128v896h128v-128h128v128h128zm128 640h805l-485-486-320 321v165zm1280 0v-165l-192-193-229 230 128 128h293zm-448-640q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19z" />
    </svg>
  ),
  displayName: 'PhotoVideoMediaIcon',
});

export default PhotoVideoMediaIcon;
