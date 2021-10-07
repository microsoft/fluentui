import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HeartIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1504 128q113 0 212 43t173 116 116 173 43 212q0 109-41 209t-118 176l-865 864-865-864Q83 981 42 881T0 672q0-112 42-211t117-173 173-117 212-43q83 0 148 19t120 52 106 81 106 103q55-56 105-103t106-80 121-53 148-19zm294 838q59-59 90-135t31-159q0-87-32-162t-88-131-132-87-163-32q-84 0-149 26t-120 70-105 97-106 111q-54-54-105-109t-106-99-121-72-148-28q-86 0-162 32t-132 89-89 133-33 162q0 83 31 159t91 135l774 774 774-774z" />
    </svg>
  ),
  displayName: 'HeartIcon',
});

export default HeartIcon;
