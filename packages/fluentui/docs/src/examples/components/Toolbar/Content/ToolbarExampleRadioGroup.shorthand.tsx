import * as React from 'react';
import { Toolbar } from '@fluentui/react-northstar';
import { BulletsIcon, NumberListIcon, ToDoListIcon } from '@fluentui/react-icons-northstar';

const ToolbarExampleRadioGroupShorthand = () => {
  const [bulletListActive, setBulletListActive] = React.useState(false);
  const [numberListActive, setNumberListActive] = React.useState(false);
  const [toDoListActive, setToDoListActive] = React.useState(false);
  return (
    <Toolbar
      aria-label="Toolbar can contain a radio group"
      items={[
        {
          key: 'radiogroup',
          kind: 'group',
          items: [
            {
              key: 'bullets',
              icon: <BulletsIcon {...{ outline: true }} />,
              active: bulletListActive,
              onClick: () => {
                setBulletListActive(!bulletListActive);

                // deselect other radio items
                setNumberListActive(false);
                setToDoListActive(false);
              },
              'aria-label': 'bullet list',
            },
            {
              key: 'number-list',
              icon: <NumberListIcon {...{ outline: true }} />,
              active: numberListActive,
              onClick: () => {
                setNumberListActive(!numberListActive);

                // deselect other radio items
                setBulletListActive(false);
                setToDoListActive(false);
              },
              'aria-label': 'number list',
            },
            {
              key: 'to-do-list',
              icon: <ToDoListIcon {...{ outline: true }} />,
              active: toDoListActive,
              onClick: () => {
                setToDoListActive(!toDoListActive);

                // deselect other radio items
                setBulletListActive(false);
                setNumberListActive(false);
              },
              'aria-label': 'to do list',
            },
          ],
        },
      ]}
    />
  );
};

export default ToolbarExampleRadioGroupShorthand;
