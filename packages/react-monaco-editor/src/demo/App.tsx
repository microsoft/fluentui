import React from 'react';
import { mergeStyleSets, Stack, Toggle } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { EditorWrapper } from '../components/EditorWrapper';
import { SUPPORTED_PACKAGES } from '../utilities/index';

const example = require('!raw-loader?esModule=false!../transpiler/examples/class.txt');

const classNames = mergeStyleSets({
  component: {
    border: '1px solid lightgray',
  },
  preview: {
    paddingTop: 20,
  },
});
const width = 800;

export const App: React.FunctionComponent = () => {
  const [useEditor, { toggle: toggleUseEditor }] = useBoolean(true);

  return (
    <Stack styles={{ root: { width, margin: '0 auto' } }} tokens={{ childrenGap: 20 }}>
      <h1>Typescript + React editor</h1>
      <Toggle inlineLabel label="Use editor" checked={useEditor} onChange={toggleUseEditor} />
      <EditorWrapper
        code={example}
        editorClassName={classNames.component}
        previewProps={{ className: classNames.preview }}
        useEditor={useEditor}
        supportedPackages={SUPPORTED_PACKAGES}
      />
    </Stack>
  );
};
