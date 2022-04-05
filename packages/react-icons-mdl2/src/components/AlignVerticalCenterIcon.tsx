import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AlignVerticalCenterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1024h-384v512h-512v-512H896v768H384v-768H0V896h384V128h512v768h256V384h512v512h384v128zM768 256H512v1408h256V256zm768 256h-256v896h256V512z" />
    </svg>
  ),
  displayName: 'AlignVerticalCenterIcon',
});

export default AlignVerticalCenterIcon;
