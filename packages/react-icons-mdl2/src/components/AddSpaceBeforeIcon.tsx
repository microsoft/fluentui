import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AddSpaceBeforeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 1792v-128h1792v128H128zm0-640h1792v128H128v-128zm1149-451l-317 317-317-317 90-90 163 163V128h128v646l163-163 90 90z" />
    </svg>
  ),
  displayName: 'AddSpaceBeforeIcon',
});

export default AddSpaceBeforeIcon;
