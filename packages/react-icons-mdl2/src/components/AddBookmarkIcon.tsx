import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AddBookmarkIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 1581l64 32q32 16 64 33v143l-128-64-640 323V0h1280v1280h-128V128H512v1712q129-65 256-130t256-129zm896 83v128h-256v256h-128v-256h-256v-128h256v-256h128v256h256z" />
    </svg>
  ),
  displayName: 'AddBookmarkIcon',
});

export default AddBookmarkIcon;
