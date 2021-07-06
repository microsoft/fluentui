import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LabelIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1720 128q41 0 77 16t63 43 43 63 16 78q0 37-10 65t-29 53-41 46-47 46v1254H256V256h1254q24-24 46-47t47-41 52-29 65-11zm0 128q-29 0-50 21l-948 948-34 135 135-34 948-948q21-21 21-50 0-30-21-51t-51-21zm-56 410l-775 776-377 94 94-377 776-775H384v1280h1280V666z" />
    </svg>
  ),
  displayName: 'LabelIcon',
});

export default LabelIcon;
