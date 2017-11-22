import { initializeIcons as i } from './fabric-icons';

const DEFAULT_BASE_URL = 'https://static2.sharepointonline.com/files/fabric/assets/icons/';

export function initializeFileTypeIcons(baseUrl: string = DEFAULT_BASE_URL): void {
  [i].forEach(
    (initialize: (url: string) => void) => initialize(baseUrl)
  );
}
