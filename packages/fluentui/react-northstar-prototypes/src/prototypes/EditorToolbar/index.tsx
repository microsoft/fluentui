import { KnobsSnippet } from '@fluentui/code-sandbox';
import { CodeSnippet, KnobInspector, KnobProvider, useBooleanKnob } from '@fluentui/docs-components';
import * as React from 'react';

import { ComponentPrototype, PrototypeSection } from '../Prototypes';
import EditorToolbar from './EditorToolbar';
import { editorToolbarReducer, initialState } from './editorToolbarReducer';
import { Button, Divider, Provider, teamsTheme } from '@fluentui/react-northstar';
import PortalWindow from './PortalWindow';

const EditorToolbarPrototype = () => {
  const [state, dispatch] = React.useReducer(editorToolbarReducer, initialState);

  return (
    <>
      <EditorToolbar {...state} dispatch={dispatch} />
      <CodeSnippet mode="json" value={state} />
    </>
  );
};

const EditorToolbarInWindowPrototype = () => {
  const [state, dispatch] = React.useReducer(editorToolbarReducer, initialState);

  const [open, setOpen] = useBooleanKnob({ name: 'open' });
  const [rtl] = useBooleanKnob({ name: 'rtl' });

  const handleClose = React.useCallback(() => setOpen(false), [setOpen]);

  return (
    <>
      <Button disabled={open} onClick={() => setOpen(true)}>
        Open window
      </Button>

      {open && (
        <PortalWindow onClose={handleClose}>
          {externalDocument => (
            <Provider
              rtl={rtl}
              theme={teamsTheme}
              styles={{ overflow: 'hidden', height: 'inherit', width: 'inherit' }}
              target={externalDocument}
            >
              <EditorToolbar {...state} dispatch={dispatch} />
            </Provider>
          )}
        </PortalWindow>
      )}
    </>
  );
};

const EditorToolbarPrototypes: React.FC = () => (
  <PrototypeSection title="Editor Toolbar">
    <ComponentPrototype
      description={
        <>
          A prototype that features the <code>overflow</code> prop of <code>Toolbar</code> component.
        </>
      }
    >
      <EditorToolbarPrototype />
    </ComponentPrototype>

    <ComponentPrototype
      title="Toolbar in Window"
      description={
        <>
          A prototype that shows that <code>Toolbar</code> can work in a separate window
        </>
      }
    >
      <KnobProvider>
        <KnobsSnippet>
          <KnobInspector />
        </KnobsSnippet>
        <Divider hidden />
        <EditorToolbarInWindowPrototype />
      </KnobProvider>
    </ComponentPrototype>
  </PrototypeSection>
);

export default EditorToolbarPrototypes;
