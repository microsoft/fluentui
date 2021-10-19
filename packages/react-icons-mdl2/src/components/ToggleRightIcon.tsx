import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ToggleRightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1898 662q73 73 111 166t39 196q0 103-38 196t-112 166q-73 73-166 111t-196 39H512q-103 0-196-38t-166-112q-73-73-111-166T0 1024q0-103 38-196t112-166q73-73 166-111t196-39h1024q103 0 196 38t166 112zm-362 746q79 0 149-30t122-82 83-122 30-150q0-79-30-149t-82-122-123-83-149-30H512q-80 0-149 30t-122 82-83 123-30 149q0 80 30 149t82 122 122 83 150 30h1024zm0-640q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55 100-20z" />
    </svg>
  ),
  displayName: 'ToggleRightIcon',
});

export default ToggleRightIcon;
