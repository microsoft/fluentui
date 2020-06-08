import * as React from 'react';
import { Text, Button } from '@fluentui/react-northstar';
import { EventListener } from '@fluentui/react-component-event-listener';
import { Editor, renderElementToJSX } from '@fluentui/docs-components';
import { Ref } from '@fluentui/react-component-ref';

import componentInfoContext from '../componentInfo/componentInfoContext';
import { ComponentInfo } from '../componentInfo/types';

// import Anatomy from './Anatomy';
import BrowserWindow from './BrowserWindow';
import Canvas from './Canvas';
import Description from './Description';
import Knobs from './Knobs';
import List from './List';
import Toolbar from './Toolbar';

import {
  jsonTreeCloneElement,
  jsonTreeDeleteElement,
  jsonTreeFindElement,
  jsonTreeFindParent,
  renderJSONTreeToJSXElement,
  resolveDraggingElement,
  resolveDrop,
} from '../config';
import {
  readTreeFromStore,
  readTreeFromURL,
  removeTreeFromStore,
  writeTreeToStore,
  writeTreeToURL,
} from '../utils/treeStore';

import { DesignerMode, JSONTreeElement } from './types';
import { ComponentTree } from './ComponentTree';
import { GetShareableLink } from './GetShareableLink';
import { codeToTree } from '../utils/codeToTree';
import ErrorBoundary from './ErrorBoundary';

const HEADER_HEIGHT = '3rem';

const getUUID = () =>
  Math.random()
    .toString(36)
    .slice(2);

export type JSONTreeOrigin = 'store' | 'url';
export type DesignerState = {
  draggingElement: JSONTreeElement;
  isExpanding: boolean;
  isSelecting: boolean;
  jsonTree: JSONTreeElement;
  jsonTreeOrigin: JSONTreeOrigin;
  mode: DesignerMode;
  selectedComponentInfo: ComponentInfo;
  selectedJSONTreeElement: any;
  showCode: boolean;
  code: string | null; // only valid if showCode is set to true
  codeError: string | null;
  showJSONTree: boolean;
};

class Designer extends React.Component<any, DesignerState> {
  potentialDropTarget: JSONTreeElement | null = null;
  dropIndex: number = -1;
  dropParent: JSONTreeElement | null = null;
  draggingPosition: { x: number; y: number } = { x: 0, y: 0 };
  draggingElementRef = React.createRef<HTMLElement>();

  constructor(props) {
    super(props);

    let jsonTreeOrigin: JSONTreeOrigin = 'url';
    let jsonTree = readTreeFromURL(window.location.href);
    if (!jsonTree) {
      jsonTree = readTreeFromStore() || this.getDefaultJSONTree();
      jsonTreeOrigin = 'store';
    }

    this.state = {
      draggingElement: null,
      isSelecting: true,
      isExpanding: true,
      jsonTree,
      jsonTreeOrigin,
      mode: 'build',
      selectedComponentInfo: null,
      selectedJSONTreeElement: null,
      showCode: false,
      code: null,
      codeError: null,
      showJSONTree: false,
    };
  }

  // TEMPORARY DEBUG DATA
  nestedChildren = [
    {
      uuid: getUUID(),
      type: 'Segment',
      children: [
        {
          uuid: getUUID(),
          type: 'Button',
          props: { content: 'click me' },
        },
        {
          uuid: getUUID(),
          type: 'div',
          children: [
            'This is div',
            {
              uuid: getUUID(),
              type: 'Button',
              props: { content: 'click me' },
            },
            {
              uuid: getUUID(),
              type: 'Segment',
              children: [
                'Hello there!',
                {
                  uuid: getUUID(),
                  type: 'Button',
                  props: { content: 'click me' },
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  getDefaultJSONTree = (): JSONTreeElement => ({ uuid: 'builder-root', type: 'div' });

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<DesignerState>, snapshot?: any): void {
    if (this.state.jsonTreeOrigin === 'store') {
      writeTreeToStore(this.state.jsonTree);
    }
  }

  handleReset = () => {
    if (confirm('Lose your changes?')) {
      removeTreeFromStore();
      const defaultJsonTree = this.getDefaultJSONTree();
      this.setState(({ showCode }) => ({
        jsonTree: defaultJsonTree,
        code: showCode ? renderElementToJSX(renderJSONTreeToJSXElement(defaultJsonTree)) : null,
        selectedComponentInfo: null,
      }));
    }
  };

  handleIsExpandingChange = isExpanding => {
    this.setState({ isExpanding });
  };

  handleShowCodeChange = showCode => {
    this.setState(({ jsonTree }) => {
      try {
        return { showCode, code: showCode ? renderElementToJSX(renderJSONTreeToJSXElement(jsonTree)) : null };
      } catch (e) {
        console.error('Failed to convert tree to code.', e.toString());
        return null;
      }
    });
  };

  handleShowJSONTreeChange = showJSONTree => {
    this.setState({ showJSONTree });
  };

  handleDragStart = (info, e) => {
    // console.log('Designer:handleDragStart')
    this.setState({
      draggingElement: resolveDraggingElement(info.displayName),
    });
    this.draggingPosition = { x: e.clientX, y: e.clientY };
  };

  handleDragAbort = () => {
    this.setState({
      draggingElement: null,
    });
  };

  handleDrag = (e: MouseEvent) => {
    // console.log('Designer:handleDrag', this.state.draggingDisplayName, e)
    this.draggingPosition = { x: e.clientX, y: e.clientY };
    if (this.draggingElementRef.current) {
      this.draggingElementRef.current.style.left = `${this.draggingPosition.x}px`;
      this.draggingElementRef.current.style.top = `${this.draggingPosition.y}px`;
    }
  };

  handleCanvasMouseUp = () => {
    this.setState(({ draggingElement, jsonTree, showCode }) => {
      console.log('Designer:handleCanvasMouseUp', {
        dropChild: draggingElement,
        dropParent: this.dropParent,
        dropIndex: this.dropIndex,
      });

      let addedComponent: JSONTreeElement | null = null;

      if (this.dropParent) {
        // TODO: it sucks we have to rely on referential mutation of the jsonTree to update it.
        //       example, here we can't simply drop 'draggingElement' on 'potentialDropTarget'.
        //       otherwise, it won't get updated in state because it isn't a reference to the jsonTree element.
        //       we first must get a reference to the element with the same uuid, then mutated that reference. womp.
        const dropParent = jsonTreeFindElement(jsonTree, this.dropParent.uuid);
        console.log({ dropParent });
        resolveDrop(draggingElement, dropParent, this.dropIndex);
        addedComponent = jsonTreeFindElement(jsonTree, draggingElement.uuid);
      }

      return {
        draggingElement: null,
        jsonTree,
        code: showCode ? renderElementToJSX(renderJSONTreeToJSXElement(jsonTree)) : null,
        ...(addedComponent && {
          selectedJSONTreeElement: addedComponent,
          selectedComponentInfo: componentInfoContext.byDisplayName[addedComponent.displayName],
        }),
      };
    });
  };

  handleSelectorHover = jsonTreeElement => {
    // console.log('Designer:handleSelectorHover', jsonTreeElement);

    this.potentialDropTarget = jsonTreeElement;
  };

  handleDropPositionChange = (dropParent, dropIndex) => {
    console.log('Designer:handleDropPositionChange', { dropIndex, dropParent });

    this.dropParent = dropParent;
    this.dropIndex = dropIndex;
  };

  handleSelectComponent = jsonTreeElement => {
    const { selectedJSONTreeElement } = this.state;

    if (jsonTreeElement) {
      if (!selectedJSONTreeElement || selectedJSONTreeElement.uuid !== jsonTreeElement.uuid) {
        console.log('Designer:handleSelectComponent - select', jsonTreeElement);
        this.setState({
          selectedJSONTreeElement: jsonTreeElement,
          selectedComponentInfo: componentInfoContext.byDisplayName[jsonTreeElement.displayName],
        });
      }
      if (selectedJSONTreeElement && selectedJSONTreeElement.uuid === jsonTreeElement.uuid) {
        console.log('Designer:handleSelectComponent - deselect', jsonTreeElement);
        this.setState({
          selectedJSONTreeElement: null,
          selectedComponentInfo: null,
        });
      }
    } else if (selectedJSONTreeElement) {
      console.log('Designer:handleSelectComponent - reset', jsonTreeElement);
      this.setState({
        selectedJSONTreeElement: null,
        selectedComponentInfo: null,
      });
    }
  };

  handleModeChange = mode => {
    // console.log('Designer:onModeChange')
    this.setState({
      mode,
      isExpanding: mode === 'build',
      isSelecting: mode === 'build' || mode === 'design',
    });
  };

  handlePropChange = ({ jsonTreeElement, name, value }) => {
    console.log('Designer:handlePropChange', jsonTreeElement, name, value);
    this.setState(({ showCode, jsonTree }) => {
      const element = jsonTreeFindElement(jsonTree, jsonTreeElement.uuid);

      console.log('...BEFORE PROP CHANGE', element);
      if (!element.props) {
        element.props = {};
      }
      element.props[name] = value;
      console.log('...AFTER PROP CHANGE', element);

      return {
        jsonTree,
        code: showCode ? renderElementToJSX(renderJSONTreeToJSXElement(jsonTree)) : null,
        selectedJSONTreeElement: element,
      };
    });
  };

  handleSelecting = isSelecting => {
    this.setState({ isSelecting });
  };

  handleCloneComponent = (e: MouseEvent) => {
    console.log('Designer:handleCloneComponent', this.state.selectedJSONTreeElement);

    this.setState(({ jsonTree, selectedJSONTreeElement }) => {
      this.draggingPosition = { x: e.clientX, y: e.clientY };
      return {
        draggingElement: jsonTreeCloneElement(jsonTree, selectedJSONTreeElement),
      };
    });
  };

  handleMoveComponent = (e: MouseEvent) => {
    console.log('Designer:handleMoveComponent', this.state.selectedJSONTreeElement);

    this.setState(({ showCode, jsonTree, selectedJSONTreeElement }) => {
      jsonTreeDeleteElement(jsonTree, selectedJSONTreeElement.uuid);
      this.draggingPosition = { x: e.clientX, y: e.clientY };
      return {
        jsonTree,
        code: showCode ? renderElementToJSX(renderJSONTreeToJSXElement(jsonTree)) : null,
        draggingElement: jsonTreeCloneElement(jsonTree, selectedJSONTreeElement),
      };
    });
  };

  handleDeleteComponent = () => {
    console.log('Designer:handleDeleteComponent', this.state.selectedJSONTreeElement);
    this.setState(({ jsonTree, showCode }) => {
      if (!this.state.selectedJSONTreeElement.uuid) {
        return null;
      }
      const modifiedTree = jsonTreeDeleteElement(jsonTree, this.state.selectedJSONTreeElement.uuid);
      return {
        jsonTree: modifiedTree,
        code: showCode ? renderElementToJSX(renderJSONTreeToJSXElement(modifiedTree)) : null,
        selectedJSONTreeElement: null,
        selectedComponentInfo: null,
      };
    });
  };

  handleGoToParentComponent = () => {
    console.log('Designer:handleGoToParentComponent', this.state.selectedJSONTreeElement);
    this.setState(state => {
      const parent = jsonTreeFindParent(state.jsonTree, this.state.selectedJSONTreeElement.uuid);
      if (!parent) {
        return null;
      }
      return {
        selectedJSONTreeElement: parent,
        selectedComponentInfo: componentInfoContext.byDisplayName[parent.displayName],
      };
    });
  };

  handleSourceCodeChange = code => {
    try {
      const modifiedTree = codeToTree(code);
      this.setState({
        jsonTree: modifiedTree,
        code,
        codeError: null,
        selectedJSONTreeElement: null,
        selectedComponentInfo: null,
      });
    } catch (e) {
      this.setState({
        code,
        codeError: e.message,
        selectedJSONTreeElement: null,
        selectedComponentInfo: null,
      });
    }
  };

  getShareableLink = () => {
    return writeTreeToURL(this.state.jsonTree, window.location.href);
  };

  switchToStore = () => {
    const jsonTree = readTreeFromStore() || this.getDefaultJSONTree();
    this.setState(({ showCode }) => ({
      jsonTree,
      code: showCode ? renderElementToJSX(renderJSONTreeToJSXElement(jsonTree)) : null,
      jsonTreeOrigin: 'store',
    }));
  };

  render() {
    const {
      draggingElement,
      isExpanding,
      isSelecting,
      jsonTree,
      jsonTreeOrigin,
      mode,
      selectedComponentInfo,
      selectedJSONTreeElement,
      showCode,
      code,
      codeError,
      showJSONTree,
    } = this.state;

    const selectedComponent =
      !draggingElement &&
      mode !== 'use' &&
      selectedJSONTreeElement?.uuid &&
      selectedJSONTreeElement.uuid !== 'builder-root' &&
      selectedJSONTreeElement;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {draggingElement && (
          <>
            <EventListener type="mousemove" listener={this.handleDrag} target={document} />
            <EventListener type="mouseup" listener={this.handleDragAbort} target={document} />
            <Ref innerRef={this.draggingElementRef}>
              <div
                style={{
                  display: 'block',
                  flex: '0 0 auto',
                  position: 'fixed',
                  padding: '4px',
                  ...(this.draggingPosition && {
                    left: this.draggingPosition.x,
                    top: this.draggingPosition.y,
                  }),
                  pointerEvents: 'none',
                  lineHeight: 1,
                  border: `1px solid salmon`,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  backgroundImage:
                    'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKUlEQVQoU2NkYGAwZkAD////RxdiYBwKCv///4/hGUZGkNNRAeMQUAgAtxof+nLDzyUAAAAASUVORK5CYII=")',
                  backgroundBlendMode: 'soft-light',
                  zIndex: 999999,
                }}
              >
                {renderJSONTreeToJSXElement(draggingElement)}
              </div>
            </Ref>
          </>
        )}

        <Toolbar
          isExpanding={isExpanding}
          isSelecting={isSelecting}
          mode={mode}
          onExpandLayoutChange={this.handleIsExpandingChange}
          onShowCodeChange={this.handleShowCodeChange}
          onShowJSONTreeChange={this.handleShowJSONTreeChange}
          onSelectingChange={this.handleSelecting}
          onReset={this.handleReset}
          onModeChange={this.handleModeChange}
          showCode={showCode}
          showJSONTree={showJSONTree}
          style={{ flex: '0 0 auto', width: '100%', height: HEADER_HEIGHT }}
        />

        <div style={{ display: 'flex', flex: 1, minWidth: '10rem', overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: '12rem',
              transition: 'opacity 0.2s',
              ...(mode === 'use' && {
                pointerEvents: 'none',
                opacity: 0,
              }),
            }}
          >
            <List style={{ overflowY: 'auto' }} onDragStart={this.handleDragStart} />
            <ComponentTree
              tree={jsonTree}
              selectedComponent={selectedComponent}
              onSelectComponent={this.handleSelectComponent}
              onCloneComponent={this.handleCloneComponent}
              onMoveComponent={this.handleMoveComponent}
              onDeleteComponent={this.handleDeleteComponent}
            />
          </div>

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
                  <div style={{ display: 'flex', alignItems: 'baseline', marginLeft: 'auto' }}>
                    {jsonTreeOrigin === 'url' && (
                      <>
                        <Text error>You are working from a shared URL, no changes are saved!</Text>
                        <Button text styles={{ paddingLeft: '.25em', minWidth: 0 }} onClick={this.switchToStore}>
                          View local
                        </Button>
                      </>
                    )}
                    {jsonTreeOrigin === 'store' && <GetShareableLink getShareableLink={this.getShareableLink} />}
                  </div>,
                ]}
                style={{
                  flex: 1,
                  margin: '1rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 0.5s',
                }}
              >
                <ErrorBoundary code={code}>
                  <Canvas
                    draggingElement={draggingElement}
                    isExpanding={isExpanding}
                    isSelecting={isSelecting || !!draggingElement}
                    onMouseMove={this.handleDrag}
                    onMouseUp={this.handleCanvasMouseUp}
                    onSelectComponent={this.handleSelectComponent}
                    onSelectorHover={this.handleSelectorHover}
                    onDropPositionChange={this.handleDropPositionChange}
                    jsonTree={jsonTree}
                    selectedComponent={selectedComponent}
                    onCloneComponent={this.handleCloneComponent}
                    onMoveComponent={this.handleMoveComponent}
                    onDeleteComponent={this.handleDeleteComponent}
                    onGoToParentComponent={this.handleGoToParentComponent}
                  />
                </ErrorBoundary>
              </BrowserWindow>

              {(showCode || showJSONTree) && (
                <div style={{ flex: '0 0 auto', maxHeight: '35vh', overflow: 'auto' }}>
                  {showCode && (
                    <div>
                      <Editor mode="jsx" height="auto" value={code} onChange={this.handleSourceCodeChange} />
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
                    <div style={{ flex: 1, padding: '1rem', color: '#543', background: '#ddd' }}>
                      <h3 style={{ margin: 0 }}>JSON Tree</h3>
                      <pre>{JSON.stringify(jsonTree, null, 2)}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {selectedComponentInfo && (
            <div
              style={{
                width: '20rem',
                padding: '1rem',
                overflow: 'auto',
                transition: 'opacity 0.2s',
                ...(mode === 'use' && {
                  pointerEvents: 'none',
                  opacity: 0,
                }),
              }}
            >
              <Description selectedJSONTreeElement={selectedJSONTreeElement} componentInfo={selectedComponentInfo} />
              {/* <Anatomy componentInfo={selectedComponentInfo} /> */}
              {selectedJSONTreeElement && (
                <Knobs
                  onPropChange={this.handlePropChange}
                  info={selectedComponentInfo}
                  jsonTreeElement={selectedJSONTreeElement}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Designer;
