import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BulletedList2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384v128H512V384h1536zM512 896h1536v128H512V896zm0 512h1536v128H512v-128zM0 256h384v384H0V256zm128 256h128V384H128v128zM0 768h384v384H0V768zm128 256h128V896H128v128zM0 1280h384v384H0v-384zm128 256h128v-128H128v128z" />
    </svg>
  ),
  displayName: 'BulletedList2Icon',
});

export default BulletedList2Icon;
