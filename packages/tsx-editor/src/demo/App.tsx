import React from 'react';
import { mergeStyleSets, Stack, Toggle } from 'office-ui-fabric-react';
import { EditorWrapper } from '../components/EditorWrapper';
import { SUPPORTED_PACKAGES } from '../utilities/index';

const example = require('!raw-loader!../transpiler/examples/class.txt');

const classNames = mergeStyleSets({
  component: {
    border: '1px solid lightgray'
  },
  preview: {
    paddingTop: 20
  }
});
const width = 800;

export const App: React.FunctionComponent = () => {
  const [useEditor, setUseEditor] = React.useState<boolean>(true);
  const onToggleChange = () => setUseEditor(!useEditor);

  return (
    <Stack styles={{ root: { width, margin: '0 auto' } }} tokens={{ childrenGap: 20 }}>
      <h1>Typescript + React editor</h1>
      <Toggle inlineLabel label="Use editor" checked={useEditor} onChange={onToggleChange} />
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
