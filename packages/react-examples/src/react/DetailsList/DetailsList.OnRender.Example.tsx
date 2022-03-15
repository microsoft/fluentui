import * as React from 'react';
import { createListItems } from '@fluentui/example-data';
import { DetailsList, buildColumns, IColumn, IDetailsColumnFieldProps } from '@fluentui/react/lib/DetailsList';
import { IRenderFunction } from '@fluentui/utilities';

export const DetailsListOnRenderExample: React.FC<{}> = (props: {}): JSX.Element => {
  const [items] = React.useState(() => {
    return createListItems(500);
  });

  const [columns] = React.useState((): IColumn[] => {
    const standardColumns = buildColumns(items);

    for (const column of standardColumns) {
      if (column.name === 'thumbnail') {
        column.onRenderField = (
          fieldProps?: IDetailsColumnFieldProps,
          defaultRender?: IRenderFunction<IDetailsColumnFieldProps>,
        ) => {
          if (!fieldProps || !defaultRender) {
            return null;
          }

          return defaultRender({
            ...fieldProps,
            onRender: (...args: any[]) => (
              <img src={fieldProps.item.thumbnail} style={{ height: '15px', display: 'block' }} />
            ),
          });
        };
      }
    }

    return standardColumns;
  });

  const onRenderField = React.useCallback(
    (fieldProps?: IDetailsColumnFieldProps, defaultRender?: IRenderFunction<IDetailsColumnFieldProps>) => {
      if (!fieldProps || !defaultRender) {
        return null;
      }

      const cell = defaultRender(fieldProps);

      return cell
        ? React.cloneElement(
            cell,
            cell.props,
            <div style={{ border: '1px solid red', borderColor: fieldProps.isSelected ? 'blue' : 'red' }}>
              {cell.props.children}
            </div>,
          )
        : null;
    },
    [],
  );

  return <DetailsList items={items} columns={columns} onRenderField={onRenderField} />;
};
