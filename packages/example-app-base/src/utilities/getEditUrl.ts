import { getDocument } from '@fluentui/react/lib/Utilities';

export interface IEditUrlOptions {
  name: string;
  section: string;
  baseUrl?: string;
  platform?: string;
}

const doc = getDocument();
const _urlResolver = doc && doc.createElement('a');

export const getEditUrl = (options: IEditUrlOptions): string | null => {
  const { name, section } = options;
  let { baseUrl, platform } = options;

  if (!baseUrl) {
    return null;
  }

  if (baseUrl.match(/\.md$/)) {
    return baseUrl;
  }

  if (!_urlResolver) {
    return null;
  }

  // Temporary workaround until github pages are in platform folders.
  _urlResolver.href = baseUrl;
  if (_urlResolver.host === 'github.com' && platform === 'web') {
    platform = undefined;
  }

  baseUrl = baseUrl.replace(/\%2F/g, '/');

  const fileName = name.replace(/\s/g, '');

  let mdUrl = `${baseUrl}/docs/${platform ? platform + '/' : ''}${fileName}${section}.md`;

  // Replace /tree/ or /blob/ with /edit/ to get straight to GitHub editor.
  if (mdUrl.indexOf('/tree/') !== -1) {
    mdUrl = mdUrl.replace('/tree/', '/edit/');
  } else if (mdUrl.indexOf('/blob/') !== -1) {
    mdUrl = mdUrl.replace('/blob/', '/edit/');
  }

  return mdUrl;
};
