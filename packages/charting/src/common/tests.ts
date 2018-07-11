/** Jest test setup file. */

import { setIconOptions } from 'office-ui-fabric-react/lib/Styling';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true
});

// Mock requestAnimationFrame for React 16+.
declare const global: { requestAnimationFrame: (cb: () => void) => void };

global.requestAnimationFrame = (callback: () => void) => {
  setTimeout(callback, 0);
};

// Configure enzyme.
configure({ adapter: new Adapter() });
