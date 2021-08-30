import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PageArrowRightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2042 1728l-317 317-90-90 163-163h-646v-128h646l-163-163 90-90 317 317zm-668 192l128 128H128V0h1115l549 549v731h-128V640h-512V128H256v1792h1118zm-94-1408h293l-293-293v293z" />
    </svg>
  ),
  displayName: 'PageArrowRightIcon',
});

export default PageArrowRightIcon;
