/* eslint-disable no-undef */
const hasDocument = typeof document === 'object' && document !== null;
const hasWindow = typeof window === 'object' && window !== null && window.self === window;
/* eslint-enable no-undef */

const isBrowser = () => hasDocument && hasWindow;

export default isBrowser;
