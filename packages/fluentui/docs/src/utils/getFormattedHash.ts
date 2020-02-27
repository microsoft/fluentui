/**
 * Retrieve hash string from location path
 */
const getFormattedHash = (hash: string): string => (hash || '').replace('#', '');

export default getFormattedHash;
