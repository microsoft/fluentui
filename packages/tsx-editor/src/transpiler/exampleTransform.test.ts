import { transformExample, identifierPattern, importPattern, classNamePattern, constNamePattern } from './exampleTransform';
import * as fs from 'fs';
import * as path from 'path';

describe('example transform', () => {
  function transformFile(file: string) {
    const filename = path.resolve(__dirname, './examples/' + file);
    const fileContents = fs.readFileSync(filename).toString();
    return transformExample(fileContents, 'fake');
  }

  it('handles examples with function components', () => {
    const result = transformFile('function.txt');
    expect(result.output).toMatchSnapshot();
  });

  it('handles examples with class components', () => {
    const result = transformFile('class.txt');
    expect(result.output).toMatchSnapshot();
  });

  it('returns an error from relative imports', () => {
    const result = transformFile('relativeImport.txt');
    expect(result.error).toBe("Error while transforming example: Unsupported import - import '../../fake.scss';.");
  });

  it('handles transpiled examples with function components', () => {
    const result = transformFile('functionTranspiled.txt');
    expect(result.output).toMatchSnapshot();
  });

  it('handles transpiled examples with class components', () => {
    const result = transformFile('classTranspiled.txt');
    expect(result.output).toMatchSnapshot();
  });

  it('returns an error from relative imports in code that was transpiled', () => {
    const result = transformFile('realtiveImportTranspiled.txt');
    expect(result.error).toBe("Error while transforming example: Unsupported import - import '../../fake.scss';.");
  });

  it('detects class names', () => {
    const classNamePatternCopy = new RegExp(classNamePattern.source);
    // This is needed to get rid of the global flag from the RegExp
    expect(`var SpinButtonBasicExample = /** @class */ (function (_super) {
      __extends(SpinButtonBasicExample, _super);
      function SpinButtonBasicExample() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      SpinButtonBasicExample.prototype.render = function () {
          return (React.createElement("div", { style: { width: '400px' } },
              React.createElement(SpinButton, { defaultValue: "0",
              label: 'Basic SpinButton:', min: 0, max: 100, step: 1,
               iconProps: { iconName: 'IncreaseIndentLegacy' },
               incrementButtonAriaLabel: 'Increase value by 1',
               decrementButtonAriaLabel: 'Decrease value by 1' })));
      };
      return SpinButtonBasicExample;
      }(React.Component));
      export { SpinButtonBasicExample };`).toMatch(classNamePatternCopy);
    expect(`var ButtonDefaultExample = /** @class */ (function (_super) {
      __extends(ButtonDefaultExample, _super);
      function ButtonDefaultExample() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ButtonDefaultExample.prototype.render = function () {
          var _a = this.props, disabled = _a.disabled,
          checked = _a.checked;
          return (React.createElement("div", { className: css(classNames.twoup) },
              React.createElement("div", null,
                  React.createElement(Label, null, "Standard"),
                  React.createElement(DefaultButton,
                    { "data-automation-id": "test", allowDisabledFocus: true,
                    disabled: disabled, checked: checked,
                    text: "Standard Button", onClick: this._alertClicked })),
              React.createElement("div", null,
                  React.createElement(Label, null, "Primary"),
                  React.createElement(PrimaryButton, {
                    "data-automation-id": "test", disabled: disabled,
                    checked: checked, text: "Primary Button",
                    onClick: this._alertClicked, allowDisabledFocus: true }))));
      };
      ButtonDefaultExample.prototype._alertClicked = function () {
          alert('Clicked');
      };
      return ButtonDefaultExample;
      }(React.Component));
      { ButtonDefaultExample };
      return React.createElement("div");`).toMatch(classNamePatternCopy);
    expect(`import * as React from 'react';
      import { Label } from 'office-ui-fabric-react/lib/Label';
      export var LabelBasicExample = function () {
      return React.createElement("div");
    };
    `).not.toMatch(classNamePatternCopy);
  });

  it('detects const names', () => {
    const constNamePatternCopy = new RegExp(constNamePattern.source);
    expect(`import * as React from 'react';
      import { Label } from 'office-ui-fabric-react/lib/Label';
      export var LabelBasicExample = function () {
          return React.createElement("div");
        };
    `).toMatch(constNamePatternCopy);
    expect(`var stackTokens = { childrenGap: 20 };
      var DropdownBasicExample = function () {
      return (React.createElement(Stack, { tokens: stackTokens },
      React.createElement(Dropdown, { placeholder: "Select an option",
      label: "Basic uncontrolled example",
      options: options, styles: dropdownStyles }),
      React.createElement(Dropdown, {
        label: "Disabled example with defaultSelectedKey",
        defaultSelectedKey: "broccoli", options: options,
        disabled: true, styles: dropdownStyles }),
      React.createElement(Dropdown, {
        placeholder: "Select options",
        label: "Multi-select uncontrolled example",
        defaultSelectedKeys: ['apple', 'banana', 'grape'],
        multiSelect: true, options: options,
        styles: dropdownStyles })));
      };
    return React.createElement("div");`).toMatch(constNamePatternCopy);
    expect(`var SpinButtonBasicExample = /** @class */ (function (_super) {
      __extends(SpinButtonBasicExample, _super);
      function SpinButtonBasicExample() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      return SpinButtonBasicExample;
      }(React.Component));
      export { SpinButtonBasicExample };`).not.toMatch(constNamePatternCopy);
  });

  it('detects imports', () => {
    const importPatternCopy = new RegExp(importPattern.source);
    expect(`import { exampleData } from '../../exampleData';`).toMatch(importPatternCopy);
    expect(`import { Label, Stack, Button } from 'office-ui-fabric-react';`).toMatch(importPatternCopy);
    expect(`const x = require('../../fake.scss');`).not.toMatch(importPatternCopy);
  });

  it('detects identifiers', () => {
    const identifierPatternCopy = new RegExp(identifierPattern.source);
    expect(`import { Label, Stack, Button } from 'office-ui-fabric-react';`).toMatch(identifierPatternCopy);
    expect(`import { exampleData } from '../../exampleData';`).toMatch(identifierPatternCopy);
    expect(`import '../../fake';`).not.toMatch(identifierPatternCopy);
  });
});
