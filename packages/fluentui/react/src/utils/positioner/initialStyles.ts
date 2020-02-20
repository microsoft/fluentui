import * as React from 'react';

const initialStyles: React.CSSProperties = {
  // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
  // https://github.com/mui-org/material-ui/issues/16740
  position: 'fixed',
  // Fix Popper.js initial positioning display issue
  // https://github.com/mui-org/material-ui/issues/17774
  top: 0,
  left: '0px /* @noflip */',
};

export default initialStyles;
