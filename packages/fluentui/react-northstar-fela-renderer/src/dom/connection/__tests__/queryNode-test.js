import { RULE_TYPE } from 'fela-utils';

import queryNode from '../queryNode';

it('should not query nodes with media attributes if media is not defined', () => {
  const nodeInvalid =
    '<style data-fela-type="RULE" type="text/css" media="screen and (min-width: 1280px)">.b{color: blue}</style>';
  const nodeValid = '<style data-fela-type="RULE" type="text/css">.a{color: red}</style>';

  document.head.innerHTML = nodeInvalid + nodeValid;

  expect(queryNode({ type: RULE_TYPE }).outerHTML).toBe(nodeValid);
});

it('should not query nodes with support attributes if support is not defined', () => {
  const nodeInvalid = '<style data-fela-type="RULE" type="text/css" data-fela-support="true">.b{color: blue}</style>';
  const nodeValid = '<style data-fela-type="RULE" type="text/css">.a{color: red}</style>';

  document.head.innerHTML = nodeInvalid + nodeValid;

  expect(queryNode({ type: RULE_TYPE }).outerHTML).toBe(nodeValid);
});
