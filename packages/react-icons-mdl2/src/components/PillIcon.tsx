import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 704q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45q0-26 19-45t45-19zm-192 192q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45q0-27 18-45t46-19zm-192-192q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45q0-26 19-45t45-19zM1531 0q107 0 201 40t165 111 110 164 41 202q0 103-39 197t-112 168L882 1897q-73 73-167 112t-198 39q-107 0-201-40t-165-111-110-164-41-202q0-103 39-197t112-168L1166 151q73-73 167-112t198-39zM517 1920q78 0 148-29t126-85l464-464-549-549-464 464q-55 55-84 126t-30 149q0 81 30 151t84 123 123 83 152 31zM1806 791q55-55 84-125t30-149q0-81-30-151t-84-124-123-83-152-31q-78 0-148 29t-126 85L796 702l550 550 460-461z" />
    </svg>
  ),
  displayName: 'PillIcon',
});

export default PillIcon;
