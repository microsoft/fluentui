import * as React from 'react';
import { Link } from 'react-router-dom';

export const LayoutSuggestions = () => (
  <>
    For layouts and positioning refer to <Link to="/components/flex">&nbsp;Flex&nbsp;</Link> and{' '}
    <Link to="/components/grid">&nbsp;Grid&nbsp;</Link> components (and general{' '}
    <Link to="/layout">&nbsp;Layout guide</Link>).
  </>
);
