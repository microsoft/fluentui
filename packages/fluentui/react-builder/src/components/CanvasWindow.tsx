import { CodeSandboxExporter, CodeSandboxState, renderElementToJSX } from "@fluentui/docs-components";
import { FilesCodeIcon, AcceptIcon } from "@fluentui/react-icons-northstar";
import { Button, Text } from "@fluentui/react-northstar";
import * as React from "react";
import { getCodeSandboxInfo, renderJSONTreeToJSXElement } from "../config";
import { useMode } from "../hooks/useMode";
import { DesignerState } from "../state/state";
import { BrowserWindow } from "./BrowserWindow";
import { Canvas } from "./Canvas";
import { CodeEditor } from "./CodeEditor";
import { ErrorBoundary } from "./ErrorBoundary";
import { GetShareableLink } from "./GetShareableLink";
import { JSONTreeElement } from "./types";

export type CanvasWindowProps = {
  isExpanding: boolean;
  isSelecting: boolean;
  jsonTree: JSONTreeElement;
  state: DesignerState;
}

export const CanvasWindow : React.FunctionComponent<CanvasWindowProps> = (props: CanvasWindowProps) => {
  const HEADER_HEIGHT = '3rem';
  const [headerMessage, setHeaderMessage] = React.useState('');
  const codeSandboxData = getCodeSandboxInfo(props.jsonTree, renderElementToJSX(renderJSONTreeToJSXElement(props.jsonTree)));
  const [{ mode }] = useMode();
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
              <Button text styles={{ paddingLeft: '.25em', minWidth: 0 }} onClick={switchToStore}>
                View local
              </Button>
            </>
          )}
          {props.state.jsonTreeOrigin === 'store' && <GetShareableLink getShareableLink={getShareableLink} />}
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
      <ErrorBoundary code={code} jsonTree={props.jsonTree}>
        <Canvas
          draggingElement={props.state.draggingElement}
          isExpanding={props.isExpanding}
          isSelecting={props.isSelecting || !!props.state.draggingElement}
          onMouseMove={handleDrag}
          onMouseUp={handleCanvasMouseUp}
          onKeyDown={handleKeyDown}
          onSelectComponent={handleSelectComponent}
          onDropPositionChange={handleDropPositionChange}
          jsonTree={props.state.5jsonTree}
          selectedComponent={selectedComponent}
          onCloneComponent={handleCloneComponent}
          onMoveComponent={handleMoveComponent}
          onDeleteSelectedComponent={handleDeleteSelectedComponent}
          onGoToParentComponent={handleGoToParentComponent}
          enabledVirtualCursor={enabledVirtualCursor}
          role="main"
          inUseMode={mode === 'use'}
          setHeaderMessage={setHeaderMessage}
          selectedComponentAccessibilityErrors={selectedComponentAccessibilityErrors}
          onAccessibilityErrors={handleAccessibilityErrorChange}
        />
      </ErrorBoundary>
    </BrowserWindow>

    {(showCode || showJSONTree) && (
      <div style={{ flex: '0 0 auto', maxHeight: '35vh', overflow: 'auto' }}>
        {showCode && (
          <div role="complementary" aria-label="Code editor">
            <React.Suspense fallback={<div>Loading...</div>}>
              <CodeEditor
                code={code}
                onCodeChange={handleSourceCodeChange}
                onCodeError={handleSourceCodeError}
              />
            </React.Suspense>
            {codeError && (
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
                {codeError}
              </pre>
            )}
          </div>
        )}
        {showJSONTree && (
          <div
            role="complementary"
            aria-label="JSON tree"
            style={{ flex: 1, padding: '1rem', color: '#543', background: '#ddd' }}
          >
            <h3 style={{ margin: 0 }}>JSON Tree</h3>
            <pre>{JSON.stringify(props.jsonTree, null, 2)}</pre>
          </div>
        )}
      </div>
    )}
  </div>
</div>)
}
