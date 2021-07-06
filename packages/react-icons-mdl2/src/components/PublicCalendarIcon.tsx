import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PublicCalendarIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1729 1283l317 317-317 317-91-90 163-163h-658l163 163-91 90-317-317 317-317 91 90-163 163h658l-163-163 91-90zM256 640v896h512v128H128V128h256V0h128v128h896V0h128v128h256v1024h-128V640H256zm128-384H256v256h1408V256h-128v128h-128V256H512v128H384V256z" />
    </svg>
  ),
  displayName: 'PublicCalendarIcon',
});

export default PublicCalendarIcon;
