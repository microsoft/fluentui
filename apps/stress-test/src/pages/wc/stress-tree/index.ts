import { getTestOptions } from '../../../shared/utils/testOptions';
import { wcTest } from '../../../shared/wc/WCTest';

wcTest().then(testNode => {
  const { r, rendererName } = getTestOptions();
  document.title += ' | ' + r ?? rendererName;

  document.querySelector('#app')?.appendChild(testNode!);
});
