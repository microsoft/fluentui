// @ts-check
// If you are adding a new tile into this site, place make sure it is also being copied from `just.config.ts`

// A build step will replace this with the list of actual built packages
/** @type {string[]} */
var packages;

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
    package: '@fluentui/docs',
    link: './react-northstar',
    icon: 'CompassNW',
    title: 'react-northstar',
  },
  {
    package: '@fluentui/react-components',
    link: './react-components/storybook/index.html',
    icon: 'Teamwork',
    title: 'Converged (@fluentui/react-components)',
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
    package: '@fluentui/react-charting',
    link: './react-charting/demo/index.html',
    icon: 'BarChart4',
    title: 'Charting',
  },
  {
    package: '@fluentui/theming-designer',
    link: './theming-designer/index.html',
    icon: 'CheckMark',
    title: 'Theme Designer Example',
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

// location.pathname will be like /pull/17568/ or /heads/master/
var hrefMatch = window.location.pathname.match(/^\/(pull|heads)\/([^/]+)/);
var repoUrl = 'https://github.com/microsoft/fluentui';
if (hrefMatch) {
  var link = /** @type {HTMLAnchorElement} */ (document.getElementById('prLink'));
  if (hrefMatch[1] === 'heads') {
    // master or other branch CI
    // eslint-disable-next-line @microsoft/sdl/no-inner-html -- Only used during PR publish, not production code.
    link.innerHTML = hrefMatch[2];
    link.href = repoUrl + '/tree/' + hrefMatch[2];
    // remove the PR-specific explanation
    var prExplanation = document.getElementById('prExplanation');
    prExplanation.parentElement.removeChild(prExplanation);
  } else {
    // PR
    // eslint-disable-next-line @microsoft/sdl/no-inner-html -- Only used during PR publish, not production code.
    link.innerHTML = 'PR #' + hrefMatch[2];
    link.href = repoUrl + '/pull/' + hrefMatch[2];
  }
}

var siteLink = document.getElementById('site-list');

siteInfo.forEach(function (info) {
  if (packages.indexOf(info.package) > -1) {
    var li = document.createElement('LI');
    li.className = 'Tile';
    // eslint-disable-next-line @microsoft/sdl/no-inner-html -- Only used during PR publish, not production code.
    li.innerHTML =
      '<a href="' +
      info.link +
      '" class="Tile-link">' +
      '<i class="ms-Icon ms-Icon--' +
      info.icon +
      '"></i>' +
      info.title +
      '</a>';

    siteLink.appendChild(li);
  }
});
