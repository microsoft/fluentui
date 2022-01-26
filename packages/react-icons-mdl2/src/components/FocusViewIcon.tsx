import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FocusViewIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 640V256h128v512H256V640h384zm-384 768v-128h512v512H640v-384H256zm1024 384v-512h512v128h-384v384h-128zm128-1152h384v128h-512V256h128v384z" />
    </svg>
  ),
  displayName: 'FocusViewIcon',
});

export default FocusViewIcon;
