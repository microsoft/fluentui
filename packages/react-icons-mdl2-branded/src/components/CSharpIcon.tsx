import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const CSharpIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1920 128v1792H128V128h1792zm-119 119H247v1554h1554V247zM873 1664q-83 0-149-27t-112-77-70-117-25-149q0-86 27-159t78-126 122-83 159-30q45 0 91 6t88 25v122q-38-23-80-34t-86-11q-64 0-114 21t-84 59-53 90-19 114q0 58 17 107t49 85 80 56 107 20q49 0 95-11t88-38v113q-48 25-101 34t-108 10zm405-309h-112l13-68h114l27-135h-119l14-68h119l39-188h78l-38 188h118l40-188h77l-39 188h111l-15 68h-111l-28 135h121l-17 68h-118l-40 181h-78l39-181h-118l-38 181h-78l39-181zm91-68h119l29-135h-119l-29 135z" />
    </svg>
  ),
  displayName: 'CSharpIcon',
});

export default CSharpIcon;
