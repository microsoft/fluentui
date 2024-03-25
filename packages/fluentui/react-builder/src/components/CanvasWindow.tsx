import { CodeSandboxExporter, CodeSandboxState, renderElementToJSX } from '@fluentui/docs-components';
import { FilesCodeIcon, AcceptIcon } from '@fluentui/react-icons-northstar';
import { Button, Text } from '@fluentui/react-northstar';
import * as React from 'react';
import { AccessibilityError } from '../accessibility/types';
import { getCodeSandboxInfo, renderJSONTreeToJSXElement } from '../config';
import { useMode } from '../hooks/useMode';
import { DesignerState } from '../state/state';
import { BrowserWindow } from './BrowserWindow';
import { Canvas } from './Canvas';
import { ErrorBoundary } from './ErrorBoundary';
import { GetShareableLink } from './GetShareableLink';
import { JSONTreeElement } from './types';

export type CanvasWindowProps = {
  selectedComponentAccessibilityErrors: AccessibilityError[];
  selectedComponent: JSONTreeElement;
  isExpanding: boolean;
  isSelecting: boolean;
  showJSONTree: boolean;
  state: DesignerState;
  getShareableLink: () => string;
  onCanvasMouseUp: () => void;
  onCloneComponent: (e: MouseEvent) => void;
  onDeleteSelectedComponent: () => void;
  onDrag: (e: MouseEvent) => void;
  onDropPositionChange: (dropParent: any, dropIndex: any) => void;
  onGoToParentComponent: () => void;
  onKeyDown: (e: KeyboardEvent) => void;
  onMoveComponent: (e: MouseEvent) => void;
  onPropUpdate: (args: { jsonTreeElement: JSONTreeElement }) => void;
  onSourceCodeChange: (code: any, jsonTree: any) => void;
  onSourceCodeError: (code: any, error: any) => void;
  onSelectComponent: (jsonTreeElement: any) => void;
  onSwitchToStore: () => void;
};

export const CanvasWindow: React.FunctionComponent<CanvasWindowProps> = (props: CanvasWindowProps) => {
  const HEADER_HEIGHT = '3rem';
  const [headerMessage, setHeaderMessage] = React.useState('');
  const codeSandboxData = getCodeSandboxInfo(
    props.state.jsonTree,
    renderElementToJSX(renderJSONTreeToJSXElement(props.state.jsonTree)),
  );
  const [{ mode }] = useMode();

  const CodeEditor = React.lazy(async () => {
    const _CodeEditor = (await import(/* webpackChunkName: "codeeditor" */ './CodeEditor')).CodeEditor;
    return {
      default: _CodeEditor,
    };
  });
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: `calc(100vh - ${HEADER_HEIGHT}`,
        }}
      >
        <BrowserWindow
          showNavBar={false}
          headerItems={[
            <div key="headerMessage" style={{ marginLeft: 10 }}>
              {mode === 'use' && <Text error>{headerMessage}</Text>}
            </div>,
            <div key="headerTools" style={{ display: 'flex', alignItems: 'baseline', marginLeft: 'auto' }}>
              {props.state.jsonTreeOrigin === 'url' && (
                <>
                  <Text error>You are working from a shared URL, no changes are saved!</Text>
                  <Button text styles={{ paddingLeft: '.25em', minWidth: 0 }} onClick={props.onSwitchToStore}>
                    View local
                  </Button>
                </>
              )}
              {props.state.jsonTreeOrigin === 'store' && <GetShareableLink getShareableLink={props.getShareableLink} />}
              <CodeSandboxExporter
                exampleCode={codeSandboxData.code}
                exampleLanguage="js"
                exampleName="uibuilder"
                imports={codeSandboxData.imports}
              >
                {(state, onCodeSandboxClick) => {
                  const codeSandboxContent =
                    state === CodeSandboxState.Default
                      ? 'CodeSandbox'
                      : state === CodeSandboxState.Loading
                      ? 'Exporting...'
                      : 'Click to open';

                  const codeSandboxIcon = state === CodeSandboxState.Default ? <FilesCodeIcon /> : <AcceptIcon />;

                  return (
                    <Button
                      loading={state === CodeSandboxState.Loading}
                      styles={{ marginTop: 'auto', marginLeft: '0.7rem' }}
                      onClick={onCodeSandboxClick}
                      icon={codeSandboxIcon}
                      content={codeSandboxContent}
                    />
                  );
                }}
              </CodeSandboxExporter>
            </div>,
          ]}
          style={{
            flex: 1,
          }}
        >
          <ErrorBoundary code={props.state.code} jsonTree={props.state.jsonTree}>
            <Canvas
              draggingElement={props.state.draggingElement}
              isExpanding={props.isExpanding}
              isSelecting={props.isSelecting || !!props.state.draggingElement}
              onMouseMove={props.onDrag}
              onMouseUp={props.onCanvasMouseUp}
              onKeyDown={props.onKeyDown}
              onSelectComponent={props.onSelectComponent}
              onDropPositionChange={props.onDropPositionChange}
              jsonTree={props.state.jsonTree}
              selectedComponent={props.selectedComponent}
              onCloneComponent={props.onCloneComponent}
              onMoveComponent={props.onMoveComponent}
              onDeleteSelectedComponent={props.onDeleteSelectedComponent}
              onGoToParentComponent={props.onGoToParentComponent}
              enabledVirtualCursor={props.state.enabledVirtualCursor}
              role="main"
              inUseMode={mode === 'use'}
              setHeaderMessage={setHeaderMessage}
              selectedComponentAccessibilityErrors={props.selectedComponentAccessibilityErrors}
            />
          </ErrorBoundary>
        </BrowserWindow>

        {(props.state.showCode || props.showJSONTree) && (
          <div style={{ flex: '0 0 auto', maxHeight: '35vh', overflow: 'auto' }}>
            {props.state.showCode && (
              <div role="complementary" aria-label="Code editor">
                <React.Suspense fallback={<div>Loading...</div>}>
                  <CodeEditor
                    code={props.state.code}
                    onCodeChange={props.onSourceCodeChange}
                    onCodeError={props.onSourceCodeError}
                  />
                </React.Suspense>
                {props.state.codeError && (
                  <pre
                    style={{
                      position: 'sticky',
                      bottom: 0,
                      padding: '1em',
                      // don't block viewport
                      maxHeight: '50vh',
                      overflowY: 'auto',
                      color: '#fff',
                      background: 'red',
                      whiteSpace: 'pre-wrap',
                      // above code editor text :/
                      zIndex: 4,
                    }}
                  >
                    {props.state.codeError}
                  </pre>
                )}
              </div>
            )}
            {props.showJSONTree && (
              <div
                role="complementary"
                aria-label="JSON tree"
                style={{ flex: 1, padding: '1rem', color: '#543', background: '#ddd' }}
              >
                <h3 style={{ margin: 0 }}>JSON Tree</h3>
                <pre>{JSON.stringify(props.state.jsonTree, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
