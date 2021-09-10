import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MapPin12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 1024l341 1024H0l341-1024h512V650q-57-14-104-45t-80-76-53-97-19-112q0-71 27-133t73-108T806 6t133-27q70 0 132 27t109 73 73 108 27 133q0 58-19 111t-52 98-81 75-104 46v374h512zM768 320q0 35 13 66t37 55 54 36 67 14q35 0 66-13t54-37 36-54 14-67q0-35-13-66t-37-54-54-37-66-14q-35 0-66 13t-55 37-36 55-14 66zm-304 875l-227 682h1403l-227-682h-389v256q0 35-25 60t-60 25q-18 0-33-6t-27-18-19-27-7-34v-256H464z" />
    </svg>
  ),
  displayName: 'MapPin12Icon',
});

export default MapPin12Icon;
