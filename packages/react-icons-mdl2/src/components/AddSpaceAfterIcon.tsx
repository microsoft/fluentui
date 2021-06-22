import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AddSpaceAfterIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 768V640h1792v128H128zm0-640h1792v128H128V128zm896 1414l163-163 90 90-317 317-317-317 90-90 163 163V896h128v646z" />
    </svg>
  ),
  displayName: 'AddSpaceAfterIcon',
});

export default AddSpaceAfterIcon;
