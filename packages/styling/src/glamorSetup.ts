import * as Glamor from 'glamor';
import rtlify from 'rtl-css-js';
import { getRTL } from '@uifabric/utilities';

interface IGlamorRulePair {
  selector: string;
  style: Glamor.CSSProperties;
}

// force speedy.
// Glamor['speedy'](true);

// tslint:disable-next-line:no-string-literal
Glamor['plugins'].add(
  ({ selector, style }: IGlamorRulePair): IGlamorRulePair => (
    {
      selector,
      style: getRTL() ? rtlify(style) : style
    }
  ));
