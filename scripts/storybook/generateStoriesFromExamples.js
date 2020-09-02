const React = require('react');

const nameMatcher = /\.\/([^/]+)\//;

function isFunctionalComponent(Component) {
  return !Component.prototype.render;
}

/**
 *
 * @param options {{key: string, stories: Set, req: () => void)}}
 */
module.exports = function generateStoriesFromExamples({ key, stories, req }) {
  const matches = key.match(nameMatcher);

  if (matches) {
    const componentName = matches[1];

    if (!stories.has(componentName)) {
      stories.set(componentName, {
        default: {
          title: componentName,
        },
      });
    }

    const storyName = key
      .substr(key.lastIndexOf('/') + 1)
      .replace('.tsx', '')
      .replace(/\./g, '_');

    const story = stories.get(componentName);
    const componentModule = req(key);

    for (let moduleExport of Object.keys(componentModule)) {
      const component = componentModule[moduleExport];
      const subStoryName = moduleExport ? moduleExport : storyName;

      if (typeof component === 'function') {
        if (!isFunctionalComponent(component)) {
          story[subStoryName] = () => React.createElement(component);
        } else {
          story[subStoryName] = component;
        }
      }
    }
  }
};
