import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FilterAscendingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1411 1347l317-317 317 317-90 90-163-163v646h-128v-646l-163 163-90-90zM0 128h2048v219l-768 768v805H768v-805L0 347V128zm1920 165v-37H128v37l768 768v731h256v-731l768-768z" />
    </svg>
  ),
  displayName: 'FilterAscendingIcon',
});

export default FilterAscendingIcon;
