import { useBooleanKnob } from '@fluentui/docs-components';
import * as React from 'react';
import { Button, Dropdown, Popup, Flex } from '@fluentui/react-northstar';
import { UserFriendsIcon } from '@fluentui/react-icons-northstar';

const inputItems = [
  {
    header: 'Robert Tolbert',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
    content: 'Software Engineer',
  },
  {
    header: 'Wanda Howard',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/WandaHoward.jpg',
    content: 'UX Designer 2',
  },
  {
    header: 'Tim Deboer',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg',
    content: 'Principal Software Engineering Manager',
  },
  {
    header: 'Amanda Brady',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg',
    content: 'Technology Consultant',
  },
  {
    header: `Ashley McCarthy`,
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AshleyMcCarthy.jpg',
    content: 'Software Engineer 2',
  },
  {
    header: 'Cameron Evans',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CameronEvans.jpg',
    content: 'Software Engineer',
  },
  {
    header: 'Carlos Slattery',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarlosSlattery.jpg',
    content: 'Senior Computer Scientist',
  },
  {
    header: 'Carole Poland',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg',
    content: 'Partner Software Engineer',
  },
  {
    header: 'Robin Counts',
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg',
    content: 'Graphic Designer',
  },
];

const getA11ySelectionMessage = {
  onAdd: item => `${item} has been selected.`,
  onRemove: item => `${item} has been removed.`,
};

const PopupControlledExample = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' });

  const closePopup = () => {
    setOpen(false);
  };

  const popupContent = (
    <>
      <Dropdown
        search
        multiple
        items={inputItems}
        placeholder="Start typing a name"
        getA11ySelectionMessage={getA11ySelectionMessage}
        noResultsMessage="We couldn't find any matches."
      />
      <br />
      <Flex gap="gap.small">
        <Flex.Item push>
          <Button content="Cancel" onClick={closePopup} />
        </Flex.Item>
        <Button primary content="Add" />
      </Flex>
    </>
  );

  return (
    <Popup
      open={open}
      onOpenChange={(e, { open }) => setOpen(open)}
      trigger={<Button icon={<UserFriendsIcon />} content="People Picker" aria-label="Choose a person." />}
      content={{
        content: popupContent,
        'aria-label': 'People picker',
      }}
      trapFocus
    />
  );
};

export default PopupControlledExample;
