import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UntagIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1600 448q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10q27 0 50 10t40 27 28 41 10 50zM896 1739l263-263 91 90-354 354L0 1024 1024 0h896v896l-353 353-91-90 316-316V128h-715l-896 896 715 715zm1149-238l-226 227 226 227-90 90-227-227-227 227-90-90 227-227-227-227 90-90 227 227 227-227 90 90z" />
    </svg>
  ),
  displayName: 'UntagIcon',
});

export default UntagIcon;
