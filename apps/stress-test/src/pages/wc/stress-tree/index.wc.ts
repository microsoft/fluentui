import { wcTest } from '../../../shared/wc/WCTest';

wcTest().then(testNode => {
  document.querySelector('#app')?.appendChild(testNode!);
});
