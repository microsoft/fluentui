import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AddIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 960v128h-960v960H960v-960H0V960h960V0h128v960h960z" />
    </svg>
  ),
  displayName: 'AddIcon',
});

export default AddIcon;
