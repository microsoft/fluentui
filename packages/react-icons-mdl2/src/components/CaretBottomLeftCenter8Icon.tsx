import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CaretBottomLeftCenter8Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1717 1792H256V331l1461 1461zM512 1536h587L512 949v587z" />
    </svg>
  ),
  displayName: 'CaretBottomLeftCenter8Icon',
});

export default CaretBottomLeftCenter8Icon;
