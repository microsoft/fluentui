import * as Glamor from 'glamor';
import rtlify from 'rtl-css-js';
import { getRTL } from '@uifabric/utilities';

Glamor['plugins'].add(
  ({ selector, style }) => (
    {
      selector,
      style: getRTL() ? rtlify(style) : style
    }
  ));
