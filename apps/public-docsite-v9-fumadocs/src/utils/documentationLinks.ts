const storybookHosts = {
  react: 'https://react.fluentui.dev/',
  headless: 'https://headless.fluentui.dev/',
};

/** Resolve links outside React Router, including legacy links in shared story descriptions. */
export function documentationLink(
  href: string,
  pageUrl: string,
  basename: string,
  format: 'html' | 'markdown',
): string {
  const collection = pageUrl.startsWith('/headless') ? 'headless' : 'react';
  if (/^(?:\.\/|\/)?\?path=/.test(href)) {
    const legacy = new URL(href.replace(/^\.\//, ''), storybookHosts[collection]);
    const story = legacy.searchParams.get('path');
    const accessibility = story?.match(/^\/docs\/concepts-developer-accessibility-components-([\w-]+)--docs$/);
    if (accessibility) {
      href = `/react/guide/accessibility/components/${accessibility[1]}${legacy.hash}`;
    } else if (story === '/docs/overview-browser-support--docs') {
      href = `/headless/guide/browser-support${legacy.hash}`;
    } else {
      return legacy.href;
    }
  }

  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) {
    return href;
  }
  const base = basename.replace(/\/$/, '');
  let relative = href;
  if (relative.startsWith(`${base}/`)) {
    relative = relative.slice(base.length);
  } else if (relative.startsWith('/docs/')) {
    relative = relative.slice('/docs'.length);
  }
  const url = new URL(relative, `https://docs.invalid${pageUrl}`);
  if (!/^\/(react|headless)(?:\/|$)/.test(url.pathname)) {
    return href;
  }
  let pathname = url.pathname.replace(/\/$/, '');
  if (/\.[^/]+$/.test(pathname) && !pathname.endsWith('.txt')) {
    return href;
  }
  if (format === 'markdown' && !pathname.endsWith('.txt')) {
    pathname += '.txt';
  }
  return `${base}${pathname}${url.search}${url.hash}`;
}
