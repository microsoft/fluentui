import keyboardKey from 'keyboard-key';
import * as React from 'react';

import componentInfoContext from '@fluentui/docs/src/utils/componentInfoContext';
import { ComponentInfo } from '@fluentui/docs/src/types';

import Anatomy from './Anatomy';
import BrowserWindow from './BrowserWindow';
import Canvas from './Canvas';
import Description from './Description';
import Knobs from './Knobs';
import List from './List';
import Toolbar from './Toolbar';

import {
  jsonTreeFindElement,
  renderJSONTreeToJSXElement,
  resolveComponent,
  resolveDraggingProps,
  resolveDrop,
} from '../config';
import { readTreeFromStore, removeTreeFromStore, writeTreeToStore } from '../utils/treeStore';

import { DesignerMode, JSONTreeElement } from './types';
import { EventListener } from '@fluentui/react-component-event-listener';
import { CodeSnippet } from '@fluentui/docs-components';
import renderElementToJSX from '@fluentui/docs/src/components/ExampleSnippet/renderElementToJSX';
import { ComponentDesignProp } from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';

const HEADER_HEIGHT = '3rem';

const getUUID = () =>
  Math.random()
    .toString(36)
    .slice(2);

export type DesignerState = {
  selectedJSONTreeElement: any;
  draggingElement: JSONTreeElement;
  isSelecting: boolean;
  jsonTree: JSONTreeElement;
  mode: DesignerMode;
  selectedComponentInfo: ComponentInfo;
  showCode: boolean;
  showJSONTree: boolean;
};

class Designer extends React.Component<any, DesignerState> {
  potentialDropTarget: JSONTreeElement | null = null;
  draggingPosition: { x: number; y: number } = { x: 0, y: 0 };
  draggingElementRef = React.createRef<HTMLElement>();

  constructor(props) {
    super(props);

    const jsonTree = readTreeFromStore();

    this.state = {
      draggingElement: null,
      isSelecting: false,
      jsonTree: jsonTree || this.getDefaultJSONTree(),
      mode: 'build',
      selectedComponentInfo: null,
      selectedJSONTreeElement: null,
      showCode: false,
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

  getDefaultJSONTree = (): JSONTreeElement => {
    return {
      uuid: getUUID(),
      type: 'div',
      props: {
        style: {
          minHeight: '100vh',
          padding: '3rem',
        },
      },
    };
  };

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<DesignerState>, snapshot?: any): void {
    writeTreeToStore(this.state.jsonTree);
  }

  handleReset = () => {
    if (confirm('Lose your changes?')) {
      removeTreeFromStore();

      this.setState({
        jsonTree: this.getDefaultJSONTree(),
        selectedComponentInfo: null,
      });
    }
  };

  handleShowCodeChange = showCode => {
    this.setState({ showCode });
  };

  handleShowJSONTreeChange = showJSONTree => {
    this.setState({ showJSONTree });
  };

  handleDragStart = (info, e) => {
    // console.log('Designer:handleDragStart')
    this.setState({
      draggingElement: {
        uuid: getUUID(),
        type: info.displayName,
        displayName: info.displayName,
        props: resolveDraggingProps(info.displayName),
      },
    });
    this.draggingPosition = { x: e.clientX, y: e.clientY };
  };

  handleDragAbort = () => {
    this.stopSelecting();
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
    this.setState(({ draggingElement, jsonTree }) => {
      console.log('Designer:handleCanvasMouseUp', {
        drop: draggingElement,
        on: this.potentialDropTarget,
      });

      if (this.potentialDropTarget) {
        // TODO: it sucks we have to rely on referential mutation of the jsonTree to update it.
        //       example, here we can't simply drop 'draggingElement' on 'potentialDropTarget'.
        //       otherwise, it won't get updated in state because it isn't a reference to the jsonTree element.
        //       we first must get a reference to the element with the same uuid, then mutated that reference. womp.
        const droppedOn = jsonTreeFindElement(jsonTree, this.potentialDropTarget.uuid);
        console.log({ droppedOn });
        resolveDrop(draggingElement, droppedOn);
      }

      return {
        draggingElement: null,
        jsonTree,
      };
    });
  };

  handleSelectorHover = jsonTreeElement => {
    if (this.potentialDropTarget?.uuid === jsonTreeElement?.uuid) {
      return;
    }

    console.log('Designer:handleSelectorHover', jsonTreeElement);

    this.potentialDropTarget = jsonTreeElement;
  };

  handleSelectComponent = jsonTreeElement => {
    const { selectedJSONTreeElement } = this.state;

    if (!jsonTreeElement || (selectedJSONTreeElement && selectedJSONTreeElement.uuid === jsonTreeElement.uuid)) {
      return;
    }

    console.log('Designer:handleSelectComponent', jsonTreeElement);

    this.setState({
      selectedJSONTreeElement: jsonTreeElement,
      selectedComponentInfo: componentInfoContext.byDisplayName[jsonTreeElement.displayName],
    });
  };

  handleModeChange = mode => {
    // console.log('Designer:onModeChange')
    this.setState({ mode });
  };

  handlePropChange = ({ jsonTreeElement, name, value }) => {
    console.log('Designer:handlePropChange', jsonTreeElement, name, value);
    this.setState(state => {
      const element = jsonTreeFindElement(state.jsonTree, jsonTreeElement.uuid);

      element.props.design = {
        ...element.props.design,
        [name]: `${value}px`,
      } as ComponentDesignProp;

      console.log(jsonTreeElement.uuid === element.uuid, element);

      return state;
    });
  };

  handleKeyDown = e => {
    const code = keyboardKey.getCode(e);

    switch (code) {
      case keyboardKey.Escape:
        this.stopSelecting();
        break;

      case keyboardKey.c:
        if (e.altKey && e.shiftKey) {
          this.startSelecting();
        }
        break;
    }
  };

  startSelecting = () => {
    this.setState({ isSelecting: true });
  };

  stopSelecting = () => {
    this.setState({ isSelecting: false });
  };

  handleSelecting = isSelecting => {
    this.setState({ isSelecting });
  };

  render() {
    const {
      draggingElement,
      isSelecting,
      jsonTree,
      mode,
      selectedComponentInfo,
      selectedJSONTreeElement,
      showCode,
      showJSONTree,
    } = this.state;

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
        <EventListener type="keydown" listener={this.handleKeyDown} target={document} />
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
                  ...(this.draggingPosition && {
                    left: this.draggingPosition.x,
                    top: this.draggingPosition.y,
                  }),
                  pointerEvents: 'none',
                  zIndex: 999999,
                }}
              >
                {React.createElement(resolveComponent(draggingElement.type), draggingElement.props)}
              </div>
            </Ref>
          </>
        )}

        <Toolbar
          showCode={showCode}
          showJSONTree={showJSONTree}
          isSelecting={isSelecting}
          onShowCodeChange={this.handleShowCodeChange}
          onShowJSONTreeChange={this.handleShowJSONTreeChange}
          onSelectingChange={this.handleSelecting}
          onReset={this.handleReset}
          onModeChange={this.handleModeChange}
          style={{ flex: '0 0 auto', width: '100%', height: HEADER_HEIGHT }}
          mode={mode}
        />

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {mode === 'build' && <List onDragStart={this.handleDragStart} style={{ overflowY: 'auto' }} />}

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
                style={{
                  flex: 1,
                  margin: mode === 'build' ? '2rem' : '1rem',
                  transition: 'margin 0.2s',
                }}
              >
                <Canvas
                  {...(draggingElement && {
                    onMouseMove: this.handleDrag,
                    onMouseUp: this.handleCanvasMouseUp,
                  })}
                  isSelecting={!!isSelecting || !!draggingElement}
                  onSelectComponent={this.handleSelectComponent}
                  onSelectorHover={this.handleSelectorHover}
                  jsonTree={jsonTree}
                />
              </BrowserWindow>

              {mode === 'build' && (showCode || showJSONTree) && (
                <div style={{ flex: '0 0 auto', maxHeight: '30vh', overflow: 'auto' }}>
                  {showCode && (
                    <CodeSnippet
                      style={{ height: '100%' }}
                      fitted
                      mode="jsx"
                      label="Copy"
                      value={renderElementToJSX(renderJSONTreeToJSXElement(jsonTree))}
                    />
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

          {selectedComponentInfo && mode !== 'use' && (
            <div style={{ width: '20rem', padding: '1rem', overflow: 'auto' }}>
              <Description selectedJSONTreeElement={selectedJSONTreeElement} componentInfo={selectedComponentInfo} />
              <Anatomy componentInfo={selectedComponentInfo} />
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
