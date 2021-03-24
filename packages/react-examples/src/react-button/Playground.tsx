import * as React from 'react';
import { Checkbox, Dropdown, IDropdownOption, Stack, TextField } from '@fluentui/react';
import { Text } from '@fluentui/react-text';

/* eslint-disable @typescript-eslint/naming-convention */

export interface PropDefinition {
  propName: string;
  propType: 'boolean' | 'string' | string[];
  defaultValue?: boolean | string;
  dependsOnProps?: string[];
}

export interface PlaygroundProps {
  children: JSX.Element;
  sections: Array<{
    sectionName: string;
    propList: PropDefinition[];
  }>;
}

const tableStyle: React.CSSProperties = {
  border: '1px solid black',
};
const cellStyle: React.CSSProperties = {
  border: '1px solid black',
  padding: '5px',
};

export const Playground = (props: PlaygroundProps): JSX.Element => {
  const { children, sections } = props;

  const [componentProps, setComponentProps] = React.useState<{ [key in string]: boolean | string } | null>(null);
  const newProps: { [key in string]: boolean | string } = {};

  const playgroundSections: JSX.Element[] = [];

  for (const section of sections) {
    const sectionList: JSX.Element[] = [];
    for (const prop of section.propList) {
      const propType = prop.propType;
      let isPropEnabled = true;

      if (componentProps && prop.dependsOnProps) {
        for (const dependentProp of prop.dependsOnProps) {
          isPropEnabled =
            isPropEnabled &&
            (dependentProp[0] === '~' ? !componentProps[dependentProp.substr(1)] : !!componentProps[dependentProp]);
        }
      }

      if (propType === 'boolean') {
        newProps[prop.propName] = prop.defaultValue || false;

        const onBooleanPropChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
          const newComponentProps: { [key in string]: boolean | string } = { ...componentProps };
          newComponentProps[prop.propName] = checked || false;
          setComponentProps(newComponentProps);
        };

        sectionList.push(
          <tr>
            <td style={cellStyle}>{prop.propName}:</td>
            <td style={cellStyle}>
              <Checkbox
                checked={
                  (componentProps && (componentProps[prop.propName] as boolean)) || (prop.defaultValue as boolean)
                }
                disabled={!isPropEnabled}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={onBooleanPropChange}
              />
            </td>
          </tr>,
        );
      } else if (propType === 'string') {
        newProps[prop.propName] = prop.defaultValue || '';

        const onStringPropChange = (
          ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
          newValue?: string,
        ) => {
          const newComponentProps: { [key in string]: boolean | string } = { ...componentProps };
          newComponentProps[prop.propName] = newValue || '';
          setComponentProps(newComponentProps);
        };

        sectionList.push(
          <tr>
            <td style={cellStyle}>{prop.propName}:</td>
            <td style={cellStyle}>
              <TextField
                value={
                  componentProps && componentProps[prop.propName]
                    ? (componentProps[prop.propName] as string)
                    : (prop.defaultValue as string)
                }
                disabled={!isPropEnabled}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={onStringPropChange}
              />
            </td>
          </tr>,
        );
      } else {
        const defaultSelectedKey = prop.defaultValue || propType[0];
        newProps[prop.propName] = prop.defaultValue || propType[0];

        const onOptionsPropChange = (
          ev?: React.FormEvent<HTMLDivElement>,
          option?: IDropdownOption<any>,
          index?: number,
        ) => {
          const newComponentProps: { [key in string]: boolean | string } = { ...componentProps };
          if (option) {
            newComponentProps[prop.propName] = (option.key as string) || '';
            setComponentProps(newComponentProps);
          }
        };

        sectionList.push(
          <tr>
            <td style={cellStyle}>{prop.propName}:</td>
            <td style={cellStyle}>
              <Dropdown
                disabled={!isPropEnabled}
                selectedKey={
                  componentProps && componentProps[prop.propName]
                    ? (componentProps[prop.propName] as string)
                    : (defaultSelectedKey as string)
                }
                options={propType.map(value => ({ key: value, text: value }))}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={onOptionsPropChange}
              />
            </td>
          </tr>,
        );
      }
    }
    playgroundSections.push(
      <>
        <tr>
          <td style={cellStyle} colSpan={2}>
            <Text variant="title3">{section.sectionName}</Text>
          </td>
        </tr>
        {sectionList}
      </>,
    );
  }

  if (componentProps === null) {
    setComponentProps(newProps);
  }

  const elementProps = {
    ...componentProps,
    children: componentProps && !componentProps.iconOnly && !componentProps.children && componentProps.content,
    icon: componentProps && componentProps.icon ? 'x' : undefined,
  };

  return (
    <>
      <Stack horizontalAlign="center">{React.cloneElement(children, elementProps || {})}</Stack>
      <table style={tableStyle} cellSpacing={0}>
        <tbody>{playgroundSections}</tbody>
      </table>
    </>
  );
};
