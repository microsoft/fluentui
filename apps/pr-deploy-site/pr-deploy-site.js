// If you are adding a new tile into this site, place make sure it is also being copied from `just.config.ts`

// Syntax here MUST BE IE11-COMPATIBLE
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
    link: './public-docsite/index.html?devhost',
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
    package: 'theming-designer',
    link: './theming-designer/index.html',
    icon: 'CheckMark',
    title: 'Theme Designer Example',
  },
  {
    package: 'perf-test',
    link: './perf-test/index.html',
    icon: 'SpeedHigh',
    title: 'Perf Tests',
  },
];

var siteLink = document.getElementById('site-list');

window.renderSiteLinks = function(packages) {
  siteInfo.forEach(function(info) {
    if (packages.indexOf(info.package) > -1) {
      var li = document.createElement('LI');
      li.className = 'Tile';
      // Syntax here MUST BE IE11-COMPATIBLE (no backticks)
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
};
