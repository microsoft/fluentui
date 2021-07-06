import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EditContactIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1243 1236q-45-51-99-90t-116-67-126-41-134-14q-88 0-170 23t-153 64-129 100-100 130-65 153-23 170H0q0-120 35-231t101-205 156-167 204-115q-113-74-176-186t-64-248q0-106 40-199t109-163T568 40 768 0q106 0 199 40t163 109 110 163 40 200q0 66-16 129t-48 119-75 103-101 83q84 32 158 82t135 117l-90 91zM384 512q0 80 30 149t82 122 122 83 150 30q79 0 149-30t122-82 83-122 30-150q0-79-30-149t-82-122-123-83-149-30q-80 0-149 30t-122 82-83 123-30 149zm1464 384q42 0 78 15t64 41 42 63 16 79q0 39-15 76t-43 65l-717 717-377 94 94-377 717-716q29-29 65-43t76-14zm51 249q21-21 21-51 0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 692-34 135 135-34 692-691z" />
    </svg>
  ),
  displayName: 'EditContactIcon',
});

export default EditContactIcon;
