import * as React from 'react';

// TODO: add story typing reflecting this structure.
// TODO: is this file of any use? remove if not.
const stories = {
  SampleKind: {
    sampleStory1: () => <div>Sample Story</div>,
    sampleStory2: () => <div>If you're seeing this, digest was not configured or unable to find your stories.</div>,
  },
};

const decorator = content => content;

const config = {
  decorator,
  stories,
};

export default config;
