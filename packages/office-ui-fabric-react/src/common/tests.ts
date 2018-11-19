/** Jest test setup file. */

import { configure } from 'enzyme';
import { initializeIcons } from '@uifabric/icons';
import * as Adapter from 'enzyme-adapter-react-16';

// Initialize icons.
initializeIcons('');

// Mock requestAnimationFrame for React 16+.
declare const global: { requestAnimationFrame: (cb: () => void) => void };

global.requestAnimationFrame = (callback: () => void) => {
  setTimeout(callback, 0);
};

// Configure enzyme.
configure({ adapter: new Adapter() });
