import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SearchIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1344 0q97 0 187 25t168 71 142 110 111 143 71 168 25 187q0 97-25 187t-71 168-110 142-143 111-168 71-187 25q-125 0-239-42t-211-121l-785 784q-19 19-45 19t-45-19-19-45q0-26 19-45l784-785q-79-96-121-210t-42-240q0-97 25-187t71-168 110-142T989 96t168-71 187-25zm0 1280q119 0 224-45t183-124 123-183 46-224q0-119-45-224t-124-183-183-123-224-46q-119 0-224 45T937 297 814 480t-46 224q0 119 45 224t124 183 183 123 224 46z" />
    </svg>
  ),
  displayName: 'SearchIcon',
});

export default SearchIcon;
