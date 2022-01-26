import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SnowflakeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1871 1276l33 124-200 53 53 201-124 33-63-237-546-315v631l173 173-90 90-147-146-147 146-90-90 173-173v-631l-546 315-63 237-124-33 53-201-200-53 33-124 237 63 546-315-546-315-237 63-33-124 200-53-53-201 124-33 63 237 546 315V282L723 109l90-90 147 146 147-146 90 90-173 173v631l546-315 63-237 124 33-53 201 200 53-33 124-237-63-546 315 546 315 237-63z" />
    </svg>
  ),
  displayName: 'SnowflakeIcon',
});

export default SnowflakeIcon;
