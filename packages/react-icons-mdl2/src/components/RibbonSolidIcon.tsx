import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RibbonSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M512 1222q107 94 238 144t274 50q143 0 274-50t238-144v826l-512-256-512 256v-826zm512 58q-88 0-170-23t-153-64-129-100-99-130-65-153-23-170q0-88 23-170t64-153 100-129T701 88t153-65 170-23q88 0 170 23t153 64 129 100 100 130 65 153 23 170q0 88-23 170t-64 153-100 129-130 100-153 65-170 23zm0-1032q-81 0-152 31t-125 84-84 124-31 153q0 81 31 152t84 125 124 84 153 31q81 0 152-31t125-84 84-124 31-153q0-81-31-152t-84-125-124-84-153-31zm0 648q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20z" />
    </svg>
  ),
  displayName: 'RibbonSolidIcon',
});

export default RibbonSolidIcon;
