import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FilterDescendingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1795 1667l163-163 90 90-315 317-325-325 90-90 169 170v-642h127l1 643zm-643 125v-731l768-768v-37H128v37l768 768v731h256zm896-1445l-768 768v805H768v-805L0 347V128h2048v219z" />
    </svg>
  ),
  displayName: 'FilterDescendingIcon',
});

export default FilterDescendingIcon;
