import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PageListMirroredSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 0v1792h1536V0H256zm1152 1152h128v128h-128v-128zm0-384h128v128h-128V768zm0-384h128v128h-128V384zm-896 768h768v128H512v-128zm0-384h768v128H512V768zm0-384h768v128H512V384z" />
    </svg>
  ),
  displayName: 'PageListMirroredSolidIcon',
});

export default PageListMirroredSolidIcon;
