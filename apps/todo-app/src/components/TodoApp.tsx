import * as React from 'react';
import { Spinner, SpinnerSize, Stack } from '@fluentui/react';
import { TodoItemData, DataProviderApi } from '../types/index';

import { TodoForm } from './TodoForm';
import { TodoTabs } from './TodoTabs';

import { appStyles } from './styles';
import strings from '../strings';

export interface TodoAppProps {
  /** The dataProvider handles data storage and operations. */
  dataProvider: DataProviderApi;
}

export const TodoApp: React.FunctionComponent<TodoAppProps> = props => {
  const { dataProvider } = props;
  const [items, setItems] = React.useState<TodoItemData[]>(dataProvider.items);
  const [isLoading, setIsLoading] = React.useState<boolean>(dataProvider.isLoading);
  const hasItems = items.length > 0;

  React.useEffect(() => {
    const onItemsChanged = () => {
      // Store both of these in state so that if either changes, the component will update
      setItems(dataProvider.items);
      setIsLoading(dataProvider.isLoading);
    };
    dataProvider.addListener(onItemsChanged);

    return () => {
      dataProvider.removeListener(onItemsChanged);
    };
  }, [dataProvider]);

  return (
    <div className={appStyles.root}>
      <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
        <h1 className={appStyles.todoHeading}>{strings.todoListTitle}</h1>
        {isLoading && hasItems && <Spinner size={SpinnerSize.medium} />}
      </Stack>
      {isLoading && !hasItems ? (
        <Spinner
          className={appStyles.fetchingTasksSpinner}
          size={SpinnerSize.large}
          label={strings.fetchingTasksLabel}
        />
      ) : (
        <>
          <TodoForm onSubmit={dataProvider.createItem} />
          <TodoTabs
            items={items}
            onToggleComplete={dataProvider.toggleComplete}
            onDeleteItem={dataProvider.deleteItem}
          />
        </>
      )}
    </div>
  );
};
TodoApp.displayName = 'TodoApp';
