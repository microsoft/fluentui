import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ClearFilterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 128h2048v219l-768 768v805H768v-805L0 347V128zm1920 165v-37H128v37l768 768v731h256v-731l768-768zm37 987l91 91-230 229 230 229-91 91-229-230-229 230-91-91 230-229-230-229 91-91 229 230 229-230z" />
    </svg>
  ),
  displayName: 'ClearFilterIcon',
});

export default ClearFilterIcon;
