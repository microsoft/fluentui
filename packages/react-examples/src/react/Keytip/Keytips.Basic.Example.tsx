import * as React from 'react';
import { keytipMap } from '@fluentui/react-examples/lib/react/Keytip/KeytipSetup';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { ComboBox } from '@fluentui/react/lib/ComboBox';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Link } from '@fluentui/react/lib/Link';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { useKeytipRef } from '@fluentui/react/lib/Keytips';

const pivotItemStyle: React.CSSProperties = { width: 500, paddingTop: 20 };
const stackTokens: IStackTokens = { childrenGap: 20 };
const spinButtonStyles: Partial<ISpinButtonStyles> = { root: { maxWidth: 200 } };

const sampleOptions = [
  { key: 'A', text: 'Option 1' },
  { key: 'B', text: 'Option 2' },
  { key: 'C', text: 'Option 3' },
];

export const KeytipsBasicExample: React.FunctionComponent = () => {
  const checkboxRef = useKeytipRef<HTMLDivElement>({ keytipProps: keytipMap.CheckboxKeytip });
  const linkRef = useKeytipRef<HTMLAnchorElement>({ keytipProps: keytipMap.LinkKeytip });
  const toggleRef = useKeytipRef<HTMLDivElement>({ keytipProps: keytipMap.ToggleKeytip });
  const spinButtonRef = useKeytipRef<HTMLDivElement>({ keytipProps: keytipMap.SpinButtonKeytip });
  const dropdownRef = useKeytipRef<HTMLDivElement>({ keytipProps: keytipMap.DropdownKeytip });
  const comboboxRef = useKeytipRef<HTMLDivElement>({ keytipProps: keytipMap.ComboBoxKeytip });

  return (
    <div>
      <p>
        For Pivots, keytips will first show for each of the pivots. After selecting a pivot, the Keytips for its content
        are shown.
      </p>
      <Pivot>
        <PivotItem headerText="Pivot 1" keytipProps={keytipMap.Pivot1Keytip} style={pivotItemStyle}>
          <Stack tokens={stackTokens}>
            <SpinButton ref={spinButtonRef} label="Spin Button" min={0} max={100} styles={spinButtonStyles} />
            <Toggle ref={toggleRef} onText="Yes" offText="No" />
            <span>
              Go to{' '}
              <Link ref={linkRef} href="http://www.bing.com" target="_blank" underline>
                Bing
              </Link>
            </span>
          </Stack>
        </PivotItem>

        <PivotItem headerText="Pivot 2" keytipProps={keytipMap.Pivot2Keytip} style={pivotItemStyle}>
          <Stack tokens={stackTokens}>
            <Checkbox label="Checkbox" ref={checkboxRef} />
            <Dropdown ref={dropdownRef} label="Dropdown" options={sampleOptions} />
          </Stack>
        </PivotItem>

        <PivotItem headerText="Pivot 3" keytipProps={keytipMap.Pivot3Keytip} style={pivotItemStyle}>
          <ComboBox ref={comboboxRef} label="Combo Box" options={sampleOptions} />
        </PivotItem>
      </Pivot>
    </div>
  );
};
