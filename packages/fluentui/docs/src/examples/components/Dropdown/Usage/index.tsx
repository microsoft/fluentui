import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Controlled"
      description="A dropdown can handle open state in controlled mode."
      examplePath="components/Dropdown/Usage/DropdownExampleControlled"
    />
    <ComponentExample
      title="Render callbacks"
      description="You can customize rendered elements with render callbacks."
      examplePath="components/Dropdown/Usage/DropdownExampleRender"
    />
    <ComponentExample
      title="Custom list header"
      description="You can add a custom message as the list header."
      examplePath="components/Dropdown/Usage/DropdownExampleHeaderMessage"
    />
    <ComponentExample
      title="Unmount memory leak demo"
      description={
        <>
          <p>Repro steps and observations</p>
          <p>Fiber nodes increase</p>
          <ol>
            <li>Open maximized example</li>
            <li>Take heap snapshot (multiple times if need, until it stabilizes)</li>
            <li>Click on "Mount/Unmount" to show Dropdown</li>
            <li>Click on "Mount/Unmount" to hide Dropdown</li>
            <li>Take heap snapshot (multiple times if need, until it stabilizes)</li>
            <li>Observe increase in FiberNodes</li>
          </ol>
          <p>Fiber nodes and detached elements/listeners increase</p>
          <ol>
            <li>Open maximized example</li>
            <li>Take heap snapshot (multiple times if need, until it stabilizes)</li>
            <li>Click on "Mount/Unmount" to show Dropdown</li>
            <li>Click on Dropdown to show elements</li>
            <li>Click on "Mount/Unmount" to hide Dropdown</li>
            <li>Take heap snapshot (multiple times if need, until it stabilizes)</li>
            <li>Observe increase in FiberNodes and increase in detached elements</li>
          </ol>
          <p>Fiber nodes, but no detached elements/listeners increase</p>
          <ol>
            <li>Open maximized example</li>
            <li>Take heap snapshot (multiple times if need, until it stabilizes)</li>
            <li>Click on "Mount/Unmount" to show Dropdown</li>
            <li>Click on Dropdown to show elements</li>
            <li>Click on Dropdown element to select it</li>
            <li>Click on "Mount/Unmount" to hide Dropdown</li>
            <li>Take heap snapshot (multiple times if need, until it stabilizes)</li>
            <li>Observe increase in FiberNodes, but no increase in detached elements</li>
          </ol>
        </>
      }
      examplePath="components/Dropdown/Usage/DropdownExampleLeakDemo"
    />
  </ExampleSection>
);

export default Usage;
