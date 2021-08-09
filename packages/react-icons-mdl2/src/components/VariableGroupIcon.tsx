import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const VariableGroupIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M690 1347q0-23 15-38t38-15q12 0 23 6t20 13 16 13 15 6q10 0 26-15t35-40 39-53 37-57 29-50 17-34q-8-34-17-67t-17-67q-8-31-17-54t-24-40-34-24-48-9q-10 0-20 1t-22 3v-25l184-33q21 23 35 46t24 48 17 51 15 57q15-22 37-56t51-67 61-55 67-24q25 0 45 13t20 41q0 54-54 54-20 0-37-9t-37-9q-19 0-40 19t-40 45-36 52-26 42l57 237q1 7 4 19t8 25 12 22 16 10q12 0 27-11t30-28 25-32 16-28l24 12q-8 19-28 47t-45 54-52 46-49 19q-22 0-36-13t-26-30q-9-16-17-46t-15-65-13-68-14-53q-11 20-26 48t-36 58-43 61-48 54-50 39-51 15q-26 0-46-17t-21-44zm826 61q54-69 83-149t29-169q0-90-29-170t-83-152h94q118 139 118 322 0 91-28 170t-90 148h-94zM0 128h2048v1664H0V128zm1920 1536V640H128v1024h1792zm0-1152V256H128v256h1792zM438 1408q-62-68-90-147t-28-171q0-183 118-322h93q-54 70-82 151t-29 171q0 87 28 168t83 150h-93z" />
    </svg>
  ),
  displayName: 'VariableGroupIcon',
});

export default VariableGroupIcon;
