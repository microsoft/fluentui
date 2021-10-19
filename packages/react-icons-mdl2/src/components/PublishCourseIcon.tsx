import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PublishCourseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1760 1590q66 33 119 81t90 107 58 128 21 142h-128q0-79-30-149t-82-122-123-83-149-30q-80 0-149 30t-122 82-83 123-30 149h-128q0-73 20-142t58-128 91-107 119-81q-75-54-117-135t-43-175q0-79 30-149t82-122 122-83 150-30q79 0 149 30t122 82 83 123 30 149q0 94-42 175t-118 135zm-224-54q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100q0 53 20 99t55 82 81 55 100 20zm-512 80q-32 37-58 77t-46 86q-53-55-128-85t-152-30H256V384H128v1408h787q-14 31-23 63t-15 65H0V256h256V128h384q88 0 169 27t151 81q69-54 150-81t170-27h384v128h256v640q-58-57-128-95V384h-128v369q-32-9-64-13t-64-4V256h-256q-70 0-136 24t-120 71v1265zm-128-13V351q-54-46-120-70t-136-25H384v1280h256q67 0 132 17t124 50z" />
    </svg>
  ),
  displayName: 'PublishCourseIcon',
});

export default PublishCourseIcon;
