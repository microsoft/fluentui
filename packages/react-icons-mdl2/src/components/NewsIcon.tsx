import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NewsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 512v896q0 53-20 99t-55 81-82 55-99 21H249q-51 0-96-20t-79-53-54-79-20-97V256h1792v256h256zm-128 128h-128v704q0 26-19 45t-45 19q-26 0-45-19t-19-45V384H128v1031q0 25 9 47t26 38 39 26 47 10h1543q27 0 50-10t40-27 28-41 10-50V640zm-384 0H256V512h1280v128zm0 768h-512v-128h512v128zm0-256h-512v-128h512v128zm0-256h-512V768h512v128zm-640 512H256V765h640v643zm-512-128h384V893H384v387z" />
    </svg>
  ),
  displayName: 'NewsIcon',
});

export default NewsIcon;
