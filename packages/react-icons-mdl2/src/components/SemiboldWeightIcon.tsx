import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SemiboldWeightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1639 1314q0 82-24 149t-65 120-98 92-123 66-138 38-145 13H512V128h528q59 0 120 8t120 28 110 48 89 72 61 98 23 126q0 73-21 136t-60 113-95 88-125 58v5q85 10 154 42t119 84 77 122 27 158zM787 350v473h179q63 0 119-14t98-46 66-81 24-119q0-64-24-105t-64-66-91-33-106-9H787zm558 953q0-79-31-129t-81-79-115-39-131-11H787v527h236q65 0 123-15t103-47 70-83 26-124z" />
    </svg>
  ),
  displayName: 'SemiboldWeightIcon',
});

export default SemiboldWeightIcon;
