import { setBaseUrl } from './utilities/resources';

setBaseUrl('./dist/');

export * from './components/index';
export * from './utilities/index';

export { loadTheme } from 'load-themed-styles';
