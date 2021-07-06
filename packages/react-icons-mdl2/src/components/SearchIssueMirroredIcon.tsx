import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SearchIssueMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 576q0 119-45 224t-124 183-183 123-224 46q-99 0-191-32t-169-94l-619 619q-19 19-45 19t-45-19-19-45q0-26 19-45l619-619q-62-77-94-169t-32-191q0-119 45-224t124-183T864 46t224-46q119 0 224 45t183 124 123 183 46 224zm-1024 0q0 93 35 174t96 142 142 96 175 36q93 0 174-35t142-96 96-142 36-175q0-93-35-174t-96-142-142-96-175-36q-93 0-174 35t-142 96-96 142-36 175zm1024 1344h128v128h-128v-128zm64-704q53 0 99 20t82 55 55 81 20 100h-128q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 29 14 52t35 45 47 44 46 51 36 63 14 81v48h-128v-33q0-16-1-32t-9-30-20-28q-30-30-59-57t-52-58-37-65-14-81q0-53 20-99t55-82 81-55 100-20z" />
    </svg>
  ),
  displayName: 'SearchIssueMirroredIcon',
});

export default SearchIssueMirroredIcon;
