// @ts-check
// If you are adding a new tile into this site, place make sure it is also being copied from `just.config.ts`

main();

/** @typedef {{package: string; link: string; icon: string; title: string}} SiteInfo */

function main() {
  /**
   * NOTE: A build step will replace this with the list of actual built packages
   * @type {string[]}
   */
  var packages = [
    /* __PACKAGES_LIST_PLACEHOLDER__ */
  ];

  /**
   * @type {SiteInfo[]}
   */
  var siteInfo = [
    {
      package: '@fluentui/public-docsite-resources',
      link: './public-docsite-resources/demo/index.html',
      icon: 'FavoriteStar',
      title: '@fluentui/react demo',
    },
    {
      package: '@fluentui/react',
      link: './react/storybook/index.html',
      icon: 'FavoriteStar',
      title: '@fluentui/react storybook',
    },
    {
      package: '@fluentui/public-docsite',
      link: './public-docsite/index.html',
      icon: 'Website',
      title: 'Website',
    },
    {
      package: '@fluentui/public-docsite-v9',
      link: './public-docsite-v9/react/index.html',
      icon: 'Teamwork',
      title: 'Converged (@fluentui/public-docsite-v9)',
    },
    {
      package: '@fluentui/web-components',
      link: './web-components/storybook/index.html',
      icon: 'Globe',
      title: 'web-components',
    },
    {
      package: '@fluentui/react-experiments',
      link: './react-experiments/demo/index.html',
      icon: 'TestBeaker',
      title: 'Experiments',
    },
    {
      package: '@fluentui/chart-docsite',
      link: './chart-docsite/storybook/index.html',
      icon: 'BarChart4',
      title: 'Charts v9',
    },
    {
      package: '@fluentui/react-charting',
      link: './react-charting/demo/index.html',
      icon: 'BarChart4',
      title: 'Charting',
    },
    {
      package: '@fluentui/chart-web-components',
      link: './chart-web-components/storybook/index.html',
      icon: 'BarChart4',
      title: 'Chart web components',
    },
    {
      package: '@fluentui/theming-designer',
      link: './theming-designer/index.html',
      icon: 'CheckMark',
      title: 'Theme Designer Example',
    },
    {
      package: '@fluentui/theme-designer',
      link: './theme-designer/storybook/index.html',
      icon: 'CheckMark',
      title: 'Theme Designer v9',
    },
    {
      package: '@fluentui/perf-test',
      link: './perf-test/index.html',
      icon: 'SpeedHigh',
      title: 'Perf Tests',
    },
    {
      package: '@fluentui/perf-test-react-components',
      link: './perf-test-react-components/index.html',
      icon: 'SpeedHigh',
      title: 'Perf Tests React-Components',
    },
  ];

  updatePrOrBranchLink(window.location.pathname);
  renderSiteLinks(packages, siteInfo);
}

/**
 * Updates the PR/branch link based on the current path.
 *
 * Note: Do not use `innerHTML` here. `window.location.pathname` is user-controlled,
 * and branch names can contain characters which would lead to XSS if injected as HTML.
 * @param {string} urlPath
 */
function updatePrOrBranchLink(urlPath) {
  // location.pathname will be like /pull/17568/ or /heads/master/
  var hrefMatch = urlPath.match(/^\/(pull|heads)\/([^/]+)/);
  if (!hrefMatch) {
    return;
  }

  var link = /** @type {HTMLAnchorElement | null} */ (document.getElementById('prLink'));
  if (!link) {
    return;
  }

  var repoUrl = 'https://github.com/microsoft/fluentui';
  var type = hrefMatch[1];
  var value = hrefMatch[2];

  if (type === 'heads') {
    // NOTE: this isn't used anymore, we deploy only from PRs, but keeping the code for potential future use
    link.textContent = value;
    link.href = repoUrl + '/tree/' + encodeURIComponent(value);

    // remove the PR-specific explanation
    var prExplanation = document.getElementById('prExplanation');
    if (prExplanation && prExplanation.parentElement) {
      prExplanation.parentElement.removeChild(prExplanation);
    }
  } else {
    // PR numbers should be digits; bail if not.
    if (!/^\d+$/.test(value)) {
      return;
    }

    link.textContent = 'PR #' + value;
    link.href = repoUrl + '/pull/' + value;
  }
}

/**
 *
 * @param {string[]} packages
 * @param {SiteInfo[]} siteInfo
 * @returns
 */
function renderSiteLinks(packages, siteInfo) {
  if (!packages || packages.length === 0) {
    return;
  }

  var siteLink = document.getElementById('site-list');
  if (!siteLink) {
    return;
  }

  siteInfo.forEach(function (info) {
    if (packages.indexOf(info.package) > -1) {
      var li = /** @type {HTMLLIElement} */ (document.createElement('LI'));
      li.className = 'Tile';

      var a = /** @type {HTMLAnchorElement} */ (document.createElement('A'));
      a.href = info.link;
      a.className = 'Tile-link';

      var icon = document.createElement('I');
      icon.className = 'ms-Icon ms-Icon--' + info.icon;
      a.appendChild(icon);
      a.appendChild(document.createTextNode(info.title));

      li.appendChild(a);

      /** @type {HTMLUListElement} */ (siteLink).appendChild(li);
    }
  });
}
