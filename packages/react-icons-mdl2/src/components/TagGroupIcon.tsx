import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TagGroupIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1600 832q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10zm192-576h256v859l-896 896-556-558Q318 1174 37 896L933 0h859v256zM987 128L219 896l165 165 805-805h475V128H987zm933 933V384h-677l-768 768 677 677 768-768z" />
    </svg>
  ),
  displayName: 'TagGroupIcon',
});

export default TagGroupIcon;
