// @ts-check

function getIconBuildScope() {
  const variant = process.env.FLUENTUI_ICON_VARIANT === 'fonts' ? 'fonts' : 'svg';
  if (process.env.FLUENTUI_VRT_ICON_SIZING === 'true') {
    return variant === 'fonts' ? 'font-sizing' : 'svg-sizing';
  }
  return variant;
}

function getIconStoryPatterns() {
  switch (getIconBuildScope()) {
    case 'font-sizing':
      return ['../src/stories/IconSizingFont.stories.tsx'];
    case 'svg-sizing':
      return ['../src/stories/IconSizing.stories.tsx'];
    default:
      return ['../src/**/!(IconSizingFont).stories.tsx'];
  }
}

/** @param {import('webpack').Configuration} config */
function isolateIconBuildCache(config) {
  // Full and focused renderer builds can run concurrently; each needs its own filesystem cache.
  if (config.cache && typeof config.cache === 'object' && config.cache.type === 'filesystem') {
    config.cache.name = `${config.cache.name ?? 'default'}-${getIconBuildScope()}`;
  }
}

module.exports = { getIconStoryPatterns, isolateIconBuildCache };
