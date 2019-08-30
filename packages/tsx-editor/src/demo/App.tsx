import React from 'react';
import { PrimaryButton, mergeStyleSets, Stack, Toggle } from 'office-ui-fabric-react';
import { EditorWrapper } from '../components/EditorWrapper';

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
  const [editorHidden, setEditorHidden] = React.useState<boolean>(true);
  const [useEditor, setUseEditor] = React.useState<boolean>(true);

  const onButtonClick = () => setEditorHidden(!editorHidden);
  const onToggleChange = () => setUseEditor(!useEditor);

  return (
    <Stack styles={{ root: { width, margin: '0 auto' } }} tokens={{ childrenGap: 20 }}>
      <h1>Typescript + React editor</h1>
      <Stack horizontal tokens={{ childrenGap: 40 }}>
        <PrimaryButton text={editorHidden ? 'Show code' : 'Hide code'} onClick={onButtonClick} />
        <Toggle inlineLabel label="Use editor" checked={useEditor} onChange={onToggleChange} />
      </Stack>
      <EditorWrapper
        code={example}
        editorClassName={classNames.component}
        previewClassName={classNames.preview}
        isCodeVisible={!editorHidden}
        useEditor={useEditor}
      />
    </Stack>
  );
};
