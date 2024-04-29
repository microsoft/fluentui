import * as React from 'react';
import { Provider, teamsTheme } from '@fluentui/react-northstar';

const reqContexts = [
  // TODO: Relative pathing isn't the best here, but docs containing perf stories isn't a package that can be added as a dep.
  require.context('../../docs/src', true, /\.perf\.tsx$/),
  // TODO: why does this break index.html?? seems to pull in stories the same way...
  // require.context('../stories', true, /\.perf\.tsx$/),
];

// TODO: can comment this out to remove Provider. this should be made part of URL / digest bundle.
// TODO: should this be specified by story? disabled by story? applied and not applied centrally?
const decorator = content => <Provider theme={teamsTheme}>{content}</Provider>;
// const decorator = content => content;

// TODO: type errors in this file aren't generating build errors. scripts should be typechecked as part of digest build.
// TODO: most of this stuff should be in digest package, not consumer config
// TODO: make nameMatcher part of consumer config with default value?
// TODO: add types for all input and output
// TODO: have default loadStories function that loads according to CSF but allows for overload
// TODO: support iterations in story? or e2e scenarios? or both?
function isFunctionalComponent(Component) {
  // TODO: are we supporting class components too? how will that affect this impl?
  return typeof Component === 'function';
}

function loadStories() {
  const stories = {};
  const nameMatcher = /\.\/([^/]+)\//;

  reqContexts.forEach(reqContext => {
    reqContext.keys().forEach((fileKey: string) => {
      const matches = fileKey.match(nameMatcher);

      // TODO: what does storybook do if two story files have the same name? merge? warn? error?
      // https://github.com/storybookjs/storybook/blob/5484720791e7621e9a164d58fbe79db49db1522d/lib/client-api/src/story_store.ts#L191
      // This code should behave the same way.
      if (matches) {
        // TODO: fluent-ui storybook "config" seems to assume differing story file formats from CSF: only one story per file, naming, etc.
        // This code was modified to support multiple stories per file. Variable naming follows storybook CSF convention.
        // https://storybook.js.org/docs/testing/automated-visual-testing/#custom-solutions
        let kindName;

        // Attempt to read story name from file with fallback to file naming.
        // https://storybook.js.org/docs/formats/component-story-format/
        // TODO: this should have typing (ideally from storybook)
        if (reqContext(fileKey).default && reqContext(fileKey).default.name) {
          kindName = reqContext(fileKey).default.name;
        } else {
          kindName = fileKey.substr(fileKey.lastIndexOf('/') + 1).replace('.perf.tsx', '');
        }

        if (stories[kindName]) {
          // TODO: this should fail build or show a more visible warning
          console.error(`Kind ${kindName} already exists! Please ensure unique naming.`);
        }

        stories[kindName] = {};

        // TODO: React docs impl was treating all defaults as stories, even if they were not functions.
        // This code ignores exports that aren't functions to more closely align with CSF format for storybook compatibility.
        Object.keys(reqContext(fileKey)).forEach(exportKey => {
          const StoryExport = reqContext(fileKey)[exportKey];

          // Assign default objects to kind even if they're not functions. Leave it up to bundle
          // render to detect and not render 'default' if it is not a function.
          if ((StoryExport && isFunctionalComponent(StoryExport)) || exportKey === 'default') {
            stories[kindName][exportKey] = StoryExport;
          }
        });
      }
    });
  });

  // TODO: If storybook has strongly defined types for kind/story structures, we should probably use them.
  // For now, return a simple nested dictionary backed by types.
  return stories;
}

// TODO: the rest of this should be handled by digest package
const config = {
  stories: loadStories(),
  decorator,
};

export default config;
