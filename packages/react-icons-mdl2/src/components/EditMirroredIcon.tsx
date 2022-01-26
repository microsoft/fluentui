import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EditMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 335q0 66 25 128t73 110l1317 1317 633 158-158-633L573 98q-48-48-110-73T335 0q-69 0-130 26T99 98 27 205 0 335zm1722 1093q-106 35-182 111t-112 183L347 640l293-293 1082 1081zm150 444l-329-82q10-46 32-87t55-73 73-54 87-33l82 329zM256 549q-25-25-48-47t-41-46-28-53-11-67q0-43 16-80t45-66 66-45 81-17q38 0 66 10t53 29 47 41 47 48L256 549z" />
    </svg>
  ),
  displayName: 'EditMirroredIcon',
});

export default EditMirroredIcon;
