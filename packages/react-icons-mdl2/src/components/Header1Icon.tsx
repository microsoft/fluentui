import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Header1Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 384v1408h-128V646q-66 59-149 90t-171 32V640q54 0 103-15t92-44 75-69 55-89l17-39h106zm-896 0h128v1408H896v-640H256v640H128V384h128v640h640V384z" />
    </svg>
  ),
  displayName: 'Header1Icon',
});

export default Header1Icon;
