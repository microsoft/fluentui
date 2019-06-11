/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { KeyCodes, resetIds } from '../../Utilities';
import { Dropdown } from './Dropdown';
import { DropdownBase } from './Dropdown.base';
import { DropdownMenuItemType, IDropdownOption, IDropdown } from './Dropdown.types';

const DEFAULT_OPTIONS: IDropdownOption[] = [
  { key: 'Header1', text: 'Header 1', itemType: DropdownMenuItemType.Header },
  { key: '1', text: '1' },
  { key: '2', text: '2', title: 'test' },
  { key: '3', text: '3' },
  { key: 'Divider1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'Header2', text: 'Header 2', itemType: DropdownMenuItemType.Header },
  { key: '4', text: '4' },
  { key: '5', text: '5' },
  { key: '6', text: '6' }
];

describe('Dropdown', () => {
  let container: HTMLElement;
  beforeEach(() => {
    resetIds();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
    }
  });

  describe('single-select', () => {
    it('Renders single-select Dropdown correctly', () => {
      const component = renderer.create(<Dropdown options={DEFAULT_OPTIONS} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('Can flip between enabled and disabled.', () => {
      ReactDOM.render(<Dropdown label="testgroup" options={DEFAULT_OPTIONS} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

      expect(dropdownRoot.className).not.toEqual(expect.stringMatching('is-disabled'));
      expect(dropdownRoot.getAttribute('data-is-focusable')).toEqual('true');

      ReactDOM.render(<Dropdown disabled={true} label="testgroup" options={DEFAULT_OPTIONS} />, container);

      expect(dropdownRoot.className).toEqual(expect.stringMatching('is-disabled'));
      expect(dropdownRoot.getAttribute('data-is-focusable')).toEqual('false');
    });

    it('Renders no selected item in default case', () => {
      ReactDOM.render(<Dropdown label="testgroup" options={DEFAULT_OPTIONS} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

      expect(titleElement.textContent).toEqual('');
    });

    it('Renders a selected item if option specifies selected', () => {
      ReactDOM.render(
        <Dropdown label="testgroup" options={[{ key: '1', text: '1', selected: true }, { key: '2', text: '2' }]} />,
        container
      );
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

      expect(titleElement.textContent).toEqual('1');
    });

    it('Renders a selected item in uncontrolled case', () => {
      ReactDOM.render(<Dropdown label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

      expect(titleElement.textContent).toEqual('1');
    });

    it('does not change the selected item in when defaultKey changes', () => {
      ReactDOM.render(<Dropdown label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

      expect(titleElement.textContent).toEqual('1');

      ReactDOM.render(<Dropdown label="testgroup" defaultSelectedKey="2" options={DEFAULT_OPTIONS} />, container);
      expect(titleElement.textContent).toEqual('1');
    });

    it('Renders a selected item in controlled case', () => {
      ReactDOM.render(<Dropdown label="testgroup" selectedKey="1" options={DEFAULT_OPTIONS} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

      expect(titleElement.textContent).toEqual('1');
    });

    it('does change the selected item in when selectedKey changes', () => {
      ReactDOM.render(<Dropdown label="testgroup" selectedKey="1" options={DEFAULT_OPTIONS} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

      expect(titleElement.textContent).toEqual('1');

      ReactDOM.render(<Dropdown label="testgroup" selectedKey="2" options={DEFAULT_OPTIONS} />, container);
      expect(titleElement.textContent).toEqual('2');
    });

    it('does clear when the selectedKey is null', () => {
      const wrapper = mount(<Dropdown selectedKey="1" options={DEFAULT_OPTIONS} />);

      expect(wrapper.find('.ms-Dropdown-title').text()).toEqual('1');

      wrapper.setProps({
        selectedKey: null,
        options: DEFAULT_OPTIONS
      });

      expect(wrapper.find('.ms-Dropdown-title').text()).toEqual('');
      wrapper.unmount();
    });

    it('Can change items in uncontrolled case', () => {
      let dropdownRoot: HTMLElement | undefined;

      try {
        ReactDOM.render(<Dropdown label="testgroup" defaultSelectedKey="1" options={DEFAULT_OPTIONS} />, container);
        dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

        ReactTestUtils.Simulate.click(dropdownRoot);

        const secondItemElement = document.querySelector('.ms-Dropdown-item[data-index="2"]') as HTMLElement;

        expect(secondItemElement.getAttribute('title')).toEqual('test');

        ReactTestUtils.Simulate.click(secondItemElement);
      } finally {
        expect(dropdownRoot!.querySelector('.ms-Dropdown-title')!.textContent).toEqual('2');
      }
    });

    it('issues the onChange callback when the selected item is different', () => {
      let dropdownRoot: HTMLElement | undefined;

      const onChangeSpy = jest.fn();

      try {
        ReactDOM.render(
          <Dropdown id="foo" label="testgroup" defaultSelectedKey="1" onChange={onChangeSpy} options={DEFAULT_OPTIONS} />,
          container
        );
        dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

        ReactTestUtils.Simulate.click(dropdownRoot);

        const secondItemElement = document.querySelector('.ms-Dropdown-item[data-index="2"]') as HTMLElement;
        ReactTestUtils.Simulate.click(secondItemElement);
      } finally {
        expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), DEFAULT_OPTIONS[2], 2);
        expect(onChangeSpy.mock.calls[0][0].target.id).toEqual('foo');
      }
    });

    it('issues the onChange callback when the selected item is the same if notifyOnReselect is true', () => {
      let dropdownRoot: HTMLElement | undefined;

      const onChangeSpy = jest.fn();

      try {
        ReactDOM.render(
          <Dropdown label="testgroup" defaultSelectedKey="3" onChange={onChangeSpy} options={DEFAULT_OPTIONS} notifyOnReselect={true} />,
          container
        );
        dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

        ReactTestUtils.Simulate.click(dropdownRoot);

        const secondItemElement = document.querySelector('.ms-Dropdown-item[data-index="3"]') as HTMLElement;
        ReactTestUtils.Simulate.click(secondItemElement);
      } finally {
        expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), DEFAULT_OPTIONS[3], 3);
      }
    });

    it('issues the onDismiss callback when dismissing options callout', () => {
      let dropdownRoot: HTMLElement | undefined;

      const onDismissSpy = jest.fn();

      try {
        ReactDOM.render(
          <Dropdown label="testgroup" defaultSelectedKey="1" onDismiss={onDismissSpy} options={DEFAULT_OPTIONS} />,
          container
        );
        dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

        ReactTestUtils.Simulate.click(dropdownRoot);

        const secondItemElement = document.querySelector('.ms-Dropdown-item[data-index="2"]') as HTMLElement;
        ReactTestUtils.Simulate.click(secondItemElement);
      } finally {
        expect(onDismissSpy).toHaveBeenCalledTimes(1);
      }
    });

    it('sets the selected item even when key is number 0', () => {
      const options = [{ key: 0, text: 'item1' }, { key: 1, text: 'item2' }];
      const selectedKey = 0;
      const dropdown = React.createRef<IDropdown>();

      const wrapper = mount(<Dropdown componentRef={dropdown} options={options} />);

      expect((dropdown.current as DropdownBase).state.selectedIndices).toEqual([]);

      const newProps = { options, selectedKey };

      wrapper.setProps(newProps);
      wrapper.update();

      expect((dropdown.current as DropdownBase).state.selectedIndices).toEqual([selectedKey]);
      wrapper.unmount();
    });

    it('selectedIndices should not contains -1 even when selectedKey is not in options', () => {
      const options = [{ key: 0, text: 'item1' }, { key: 1, text: 'item2' }];
      let selectedKey = 0;
      const dropdown = React.createRef<IDropdown>();

      const wrapper = mount(<Dropdown componentRef={dropdown} options={options} selectedKey={selectedKey} />);

      expect((dropdown.current as DropdownBase).state.selectedIndices).toEqual([selectedKey]);

      selectedKey = -1;
      const newProps = { options, selectedKey };

      wrapper.setProps(newProps);
      wrapper.update();

      expect((dropdown.current as DropdownBase).state.selectedIndices).toEqual([]);
      wrapper.unmount();
    });

    it('does not issue the onChange callback when the selected item is not different', () => {
      let dropdownRoot: HTMLElement | undefined;

      const onChangeSpy = jest.fn();

      try {
        ReactDOM.render(<Dropdown label="testgroup" defaultSelectedKey="1" onChange={onChangeSpy} options={DEFAULT_OPTIONS} />, container);
        dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

        ReactTestUtils.Simulate.click(dropdownRoot);

        const secondItemElement = document.querySelector('.ms-Dropdown-item[data-index="1"]') as HTMLElement;
        ReactTestUtils.Simulate.click(secondItemElement);
      } finally {
        expect(onChangeSpy).not.toHaveBeenCalled();
      }
    });

    it('Keypresses on a disabled dropdown has no effect.', () => {
      const options = [...DEFAULT_OPTIONS];
      options[3] = { key: 3, text: '3', selected: true };
      ReactDOM.render(<Dropdown label="testgroup" disabled options={options} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
      expect(titleElement.textContent).toEqual('3');
      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.down });
      expect(titleElement.textContent).toEqual('3');
      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.up });
      expect(titleElement.textContent).toEqual('3');
    });

    it('Keypresses on a normal dropdown selects the right, valid items.', () => {
      const options = [...DEFAULT_OPTIONS];
      options[3] = { key: 3, text: '3', selected: true };
      ReactDOM.render(<Dropdown label="testgroup" options={options} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
      expect(titleElement.textContent).toEqual('3');
      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.down });
      expect(titleElement.textContent).toEqual('4');
      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.up });
      expect(titleElement.textContent).toEqual('3');
      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.up });
      expect(titleElement.textContent).toEqual('2');
    });

    it('Will select the first valid item on focus', () => {
      ReactDOM.render(<Dropdown label="testgroup" options={DEFAULT_OPTIONS} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      ReactTestUtils.Simulate.focus(dropdownRoot);

      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
      expect(titleElement.textContent).toEqual('1');
    });

    it('Will select the first valid item on Home keypress', () => {
      ReactDOM.render(<Dropdown label="testgroup" options={DEFAULT_OPTIONS} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.home });

      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
      expect(titleElement.textContent).toEqual('1');
    });

    it('Will select the last valid item on End keypress', () => {
      ReactDOM.render(<Dropdown label="testgroup" options={DEFAULT_OPTIONS} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.end });

      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
      expect(titleElement.textContent).toEqual('6');
    });

    it('Will skip over headers and separators on keypress', () => {
      let dropdownRoot;
      let titleElement;

      ReactDOM.render(<Dropdown label="testgroup" options={DEFAULT_OPTIONS} />, container);
      dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.down });
      titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
      expect(titleElement.textContent).toEqual('1');

      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.down });
      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.down });
      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.down });
      titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
      expect(titleElement.textContent).toEqual('4');
    });

    it('Shows correct tooltip with and without title prop specified', () => {
      let dropdownRoot: HTMLElement | undefined;

      ReactDOM.render(<Dropdown label="testgroup" options={DEFAULT_OPTIONS} />, container);
      dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

      ReactTestUtils.Simulate.click(dropdownRoot);

      const firstItemElement = document.querySelector('.ms-Dropdown-item[data-index="1"]') as HTMLElement;
      expect(firstItemElement.getAttribute('title')).toEqual('1');

      const secondItemElement = document.querySelector('.ms-Dropdown-item[data-index="2"]') as HTMLElement;
      expect(secondItemElement.getAttribute('title')).toEqual('test');

      const thirdItemElement = document.querySelector('.ms-Dropdown-item[data-index="3"]') as HTMLElement;
      expect(thirdItemElement.getAttribute('title')).toEqual('3');
    });

    it('opens on focus if openOnKeyboardFocus is true', () => {
      let dropdownRoot: HTMLElement | undefined;

      ReactDOM.render(<Dropdown key={'asdf'} openOnKeyboardFocus label="testgroup" options={DEFAULT_OPTIONS} />, container);
      dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      ReactTestUtils.Simulate.focus(dropdownRoot);

      const secondItemElement = document.querySelector('.ms-Dropdown-item[data-index="2"]') as HTMLElement;
      expect(!!secondItemElement).toEqual(true);
    });
  });

  describe('multi-select', () => {
    it('Renders multiselect Dropdown correctly', () => {
      const component = renderer.create(<Dropdown options={DEFAULT_OPTIONS} multiSelect />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('Renders no selected item in default case', () => {
      ReactDOM.render(<Dropdown label="testgroup" options={DEFAULT_OPTIONS} multiSelect />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

      expect(titleElement.textContent).toEqual('');
    });

    it('Renders a selected item if option specifies selected', () => {
      ReactDOM.render(
        <Dropdown label="testgroup" options={[{ key: '1', text: '1', selected: true }, { key: '2', text: '2' }]} multiSelect />,
        container
      );
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

      expect(titleElement.textContent).toEqual('1');
    });

    it('sets the selected items even when key is number 0', () => {
      const options = [{ key: 0, text: 'item1' }, { key: 1, text: 'item2' }];
      const selectedKeys = [0, 1];
      const dropdown = React.createRef<IDropdown>();
      const wrapper = mount(<Dropdown multiSelect componentRef={dropdown} options={options} />);

      // Use .dive() because Dropdown is a decorated component
      let state = (dropdown.current as DropdownBase).state.selectedIndices;
      expect(state).toEqual([]);

      const newProps = { options, selectedKeys };
      wrapper.setProps(newProps);
      wrapper.update();
      state = (dropdown.current as DropdownBase).state.selectedIndices;
      expect(state).toEqual(selectedKeys);
      wrapper.unmount();
    });

    it('selectedIndices should not contains -1 even when selectedKeys item is not in options', () => {
      const options = [{ key: 0, text: 'item1' }, { key: 1, text: 'item2' }];
      let selectedKeys = [0];
      const dropdown = React.createRef<IDropdown>();

      const wrapper = mount(<Dropdown componentRef={dropdown} options={options} selectedKeys={selectedKeys} multiSelect />);

      expect((dropdown.current as DropdownBase).state.selectedIndices).toEqual(selectedKeys);

      selectedKeys = [-1];
      const newProps = { options, selectedKeys };

      wrapper.setProps(newProps);
      wrapper.update();

      expect((dropdown.current as DropdownBase).state.selectedIndices).toEqual([]);
    });

    it('Renders multiple selected items if multiple options specify selected', () => {
      ReactDOM.render(
        <Dropdown
          label="testgroup"
          options={[{ key: '1', text: '1', selected: true }, { key: '2', text: '2', selected: true }]}
          multiSelect
        />,
        container
      );
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

      expect(titleElement.textContent).toEqual('1, 2');
    });

    it('Renders a selected item in uncontrolled case', () => {
      ReactDOM.render(<Dropdown label="testgroup" defaultSelectedKeys={['1', '2']} multiSelect options={DEFAULT_OPTIONS} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

      expect(titleElement.textContent).toEqual('1, 2');
    });

    it('does not change the selected items when defaultSelectedKeys changes', () => {
      ReactDOM.render(<Dropdown label="testgroup" defaultSelectedKeys={['1', '2']} multiSelect options={DEFAULT_OPTIONS} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

      expect(titleElement.textContent).toEqual('1, 2');

      ReactDOM.render(<Dropdown label="testgroup" defaultSelectedKeys={['3', '4']} multiSelect options={DEFAULT_OPTIONS} />, container);

      expect(titleElement.textContent).toEqual('1, 2');
    });

    it('Renders selected items in controlled case', () => {
      ReactDOM.render(<Dropdown label="testgroup" selectedKeys={['1', '3']} multiSelect options={DEFAULT_OPTIONS} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

      expect(titleElement.textContent).toEqual('1, 3');
    });

    it('changes selected items in controlled case', () => {
      ReactDOM.render(<Dropdown label="testgroup" selectedKeys={['1', '3']} multiSelect options={DEFAULT_OPTIONS} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

      expect(titleElement.textContent).toEqual('1, 3');

      ReactDOM.render(<Dropdown label="testgroup" selectedKeys={['2', '4']} multiSelect options={DEFAULT_OPTIONS} />, container);
      expect(titleElement.textContent).toEqual('2, 4');
    });

    it("Preserves selected items in controlled case if they don't change", () => {
      ReactDOM.render(<Dropdown label="testgroup" selectedKey={'1'} options={DEFAULT_OPTIONS} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

      expect(titleElement.textContent).toEqual('1');
      ReactTestUtils.Simulate.click(dropdownRoot);

      const secondItemElement = document.querySelectorAll('.ms-Dropdown-item')[2] as HTMLElement;
      ReactTestUtils.Simulate.click(secondItemElement);

      expect(titleElement.textContent).toEqual('1');
    });

    it('Can change items in uncontrolled case', () => {
      let dropdownRoot: HTMLElement | undefined;

      document.body.appendChild(container);

      try {
        ReactDOM.render(
          <Dropdown label="testgroup" defaultSelectedKeys={['1']} multiSelect id="test" options={DEFAULT_OPTIONS} />,
          container
        );
        dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

        ReactTestUtils.Simulate.click(dropdownRoot);

        const secondItemElement = document.querySelectorAll('.ms-Dropdown-item > input[type="checkbox"]')[1] as HTMLElement;
        ReactTestUtils.Simulate.change(secondItemElement);
      } finally {
        expect(dropdownRoot!.querySelector('.ms-Dropdown-title')!.textContent).toEqual('1, 2');
      }
    });

    /*
    // I'm not sure why these two tests fail. I've manually verified the scenario, even manually through programatic clicks, but these
    // tests simply won't pass
    it('issues the onChanged callback when selecting an item', () => {
      const container = document.createElement('div');
      const dropdownRoot: HTMLElement | undefined;

      document.body.appendChild(container);

      const onChangedSpy = jest.fn();

      try {
        ReactDOM.render(
          <Dropdown
            label='testgroup'
            defaultSelectedKeys={ ['1'] }
            multiSelect
            onChanged={ onChangedSpy }
            options={ DEFAULT_OPTIONS }
          />,
          container);
        dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

        ReactTestUtils.Simulate.click(dropdownRoot);

        const secondItemElement = document.querySelectorAll('.ms-Dropdown-item[role="checkbox"]')[1] as HTMLElement;
        ReactTestUtils.Simulate.click(secondItemElement);
      }
      finally {
        expect(onChangedSpy).toHaveBeenCalledWith({ ...DEFAULT_OPTIONS[2], selected: true }, 2);
      }
    });

    it('issues the onChanged callback when unselecting an item', () => {
      const container = document.createElement('div');
      const dropdownRoot: HTMLElement | undefined;

      document.body.appendChild(container);

      const onChangedSpy = jest.fn();

      try {
        ReactDOM.render(
          <Dropdown
            label='testgroup'
            defaultSelectedKeys={ ['1'] }
            multiSelect
            onChanged={ onChangedSpy }
            options={ DEFAULT_OPTIONS }
          />,
          container);
        dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

        ReactTestUtils.Simulate.click(dropdownRoot);

        const firstItemElement = document.querySelectorAll('.ms-Dropdown-item[role="checkbox"]')[0] as HTMLElement;
        ReactTestUtils.Simulate.click(firstItemElement);
      }
      finally {
        expect(onChangedSpy).toHaveBeenCalledWith({ ...DEFAULT_OPTIONS[1], selected: false }, 1);
      }
    });
    */

    it('Will not select the first valid item on keypress', () => {
      ReactDOM.render(<Dropdown label="testgroup" options={DEFAULT_OPTIONS} multiSelect />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.down });

      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
      expect(titleElement.textContent).toEqual('');
    });

    it('Will not select the first valid item on Home keypress', () => {
      ReactDOM.render(<Dropdown label="testgroup" options={DEFAULT_OPTIONS} multiSelect />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.home });

      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
      expect(titleElement.textContent).toEqual('');
    });

    it('Will not select the last valid item on End keypress', () => {
      ReactDOM.render(<Dropdown label="testgroup" options={DEFAULT_OPTIONS} multiSelect />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.end });

      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
      expect(titleElement.textContent).toEqual('');
    });

    it('Will skip disabled items on keydown', () => {
      const options = [{ key: 0, text: '1' }, { key: 1, text: '2', disabled: true }, { key: 2, text: '3' }];

      ReactDOM.render(<Dropdown label="testgroup" options={options} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.down });

      const titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
      expect(titleElement.textContent).toEqual('1');

      ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.down });
      expect(titleElement.textContent).toEqual('3');
    });
  });

  describe('Aria attributes', () => {
    it('does not apply aria-labelledby if no label is provided', () => {
      const options = [{ key: 0, text: '1' }, { key: 1, text: '2', disabled: true }, { key: 2, text: '3' }];

      ReactDOM.render(<Dropdown options={options} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

      expect(dropdownRoot.attributes.getNamedItem('aria-labelledby')).toBeNull();
    });

    it('does not apply aria-labelledby if an empty label is provided', () => {
      const options = [{ key: 0, text: '1' }, { key: 1, text: '2', disabled: true }, { key: 2, text: '3' }];

      ReactDOM.render(<Dropdown label="" options={options} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

      expect(dropdownRoot.attributes.getNamedItem('aria-labelledby')).toBeNull();
    });

    it('applies aria-labelledby if a non-empty label is provided', () => {
      const options = [{ key: 0, text: '1' }, { key: 1, text: '2', disabled: true }, { key: 2, text: '3' }];

      ReactDOM.render(<Dropdown label="Test label" options={options} />, container);
      const dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

      expect(dropdownRoot.attributes.getNamedItem('aria-labelledby')).not.toBeNull();
    });
  });

  describe('with simulated async loaded options', () => {
    /** See https://github.com/OfficeDev/office-ui-fabric-react/issues/7315 */
    class DropdownWithChangingProps extends React.Component<{ multi: boolean }, { options?: IDropdownOption[] }> {
      public state = {
        options: undefined
      };

      public componentDidMount() {
        this.loadOptions();
      }

      public render() {
        return (
          <div className="docs-DropdownExample">
            {this.props.multi ? (
              <Dropdown label="Basic uncontrolled example:" defaultSelectedKeys={['B', 'D']} options={this.state.options!} multiSelect />
            ) : (
              <Dropdown label="Basic uncontrolled example:" defaultSelectedKey={'B'} options={this.state.options!} />
            )}
          </div>
        );
      }

      public loadOptions() {
        this.setState({
          options: [
            { key: 'A', text: 'Option a', title: 'I am option a.' },
            { key: 'B', text: 'Option b' },
            { key: 'C', text: 'Option c', disabled: true },
            { key: 'D', text: 'Option d' },
            { key: 'E', text: 'Option e' }
          ]
        });
      }
    }

    it('defaultSelectedKey value is respected if Dropdown options change for single-select Dropdown.', () => {
      ReactDOM.render(<DropdownWithChangingProps multi={false} />, container);
      const dropdownOptionText = container.querySelector('.ms-Dropdown-title>span') as HTMLSpanElement;

      expect(dropdownOptionText.innerHTML).toBe('Option b');
    });

    it('defaultSelectedKeys value is respected if Dropdown options change for multi-select Dropdown.', () => {
      ReactDOM.render(<DropdownWithChangingProps multi={true} />, container);
      const dropdownOptionText = container.querySelector('.ms-Dropdown-title>span') as HTMLSpanElement;

      expect(dropdownOptionText.innerHTML).toBe('Option b, Option d');
    });
  });
});
