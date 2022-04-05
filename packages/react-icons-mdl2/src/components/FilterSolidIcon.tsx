import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FilterSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v219l-768 768v805H768v-805L0 347V128h2048z" />
    </svg>
  ),
  displayName: 'FilterSolidIcon',
});

export default FilterSolidIcon;
