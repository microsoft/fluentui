import * as React from 'react';
import { mount } from 'enzyme';
import config from '@uifabric/build/config';

// hack to work around lack of esModuleInterop
import * as StackUtilsType from 'stack-utils'; // eslint-disable-line
const StackUtils: typeof StackUtilsType = require('stack-utils');

// Stack cleaner that should remove stack entries *except* the ones from the component itself
const stackUtils = new StackUtils({
  cwd: config.paths.base(),
  internals: StackUtils.nodeInternals().concat(/node_modules/, /react[\\/]test/, /anonymous/, /\butils\b/),
});
const reactComponentsRegex = /[\\/]react[/\\]src[/\\]components[\\/]/;

/**
 * Get the file path within the repo for a component.
 */
export default function getComponentPath(Component: React.ComponentType, constructorName: string): string {
  // Prevent framework code from logging errors
  const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
  const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();
  // Hack to make UIComponent constructor throw an exception
  (window as any).gettingComponentPath = true;

  let error = '';
  let result = '';

  try {
    // Attempt to cause an exception to be thrown from within the component code, so we can get
    // the path from the stack.
    if (Component.prototype) {
      // Class component. Try a couple different approaches.
      new (Component as React.ComponentClass)(null); // eslint-disable-line
      mount(<Component />);
    } else {
      // Function component.
      // Calling as a function (not rendering) will likely result in an invalid hook error.
      (Component as Function)(null);
    }
  } catch (err) {
    const cleanedStack = stackUtils.clean(err.stack).split(/\r?\n/g);
    const componentLine = cleanedStack.find(line => reactComponentsRegex.test(line));
    // const componentLine = stackUtils.clean(err.stack.split(`${err.name}: ${err.message}`)[1].trim()).split(/\r?\n/g)[0];
    if (reactComponentsRegex.test(componentLine)) {
      result = stackUtils.parseLine(componentLine).file;
    } else {
      error = `getComponentPath algorithm did not return a correct path for ${constructorName}!

Got:
${componentLine}

From original stack:
${err.stack}`;
    }
  } finally {
    consoleErrorMock.mockRestore();
    consoleWarnMock.mockRestore();
    (window as any).gettingComponentPath = false;
  }

  if (!result) {
    // eslint-disable-next-line no-console
    console.error(error || `getComponentPath algorithm could not find a path for ${constructorName}!`);
  }

  return result;
}
