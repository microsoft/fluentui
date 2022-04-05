import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MoveIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M245 1024l206 205-91 91L0 960l360-360 91 91-206 205h395v128H245zm1675-64l-356 355-90-90 201-201h-395V896h395l-206-205 91-91 360 360zM695 446l-90-90L960 0l360 360-91 91-205-206v395H896V245L695 446zm534 1023l91 91-360 360-360-360 91-91 205 206v-395h128v395l205-206z" />
    </svg>
  ),
  displayName: 'MoveIcon',
});

export default MoveIcon;
