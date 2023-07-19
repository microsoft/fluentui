import * as React from 'react';
import {
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  Dropdown,
  Option,
  DropdownProps,
  MenuGroup,
  MenuDivider,
  PopoverProps,
  PositioningShorthand,
  Image,
} from '@fluentui/react-components';
import { resolvePositioningShorthand } from '@fluentui/react-positioning';

const useAutoSizedPositioning = (positioning?: PositioningShorthand) => {
  return React.useMemo(
    () => ({
      autoSize: true,
      ...resolvePositioningShorthand(positioning),
    }),
    [positioning],
  );
};

const PopoverAutoSized: React.FC<PopoverProps> = props => {
  const positioning = useAutoSizedPositioning(props.positioning);
  return <Popover {...props} positioning={positioning} />;
};
const MenuAutoSized: React.FC<PopoverProps> = props => {
  const positioning = useAutoSizedPositioning(props.positioning);
  return <Menu {...props} positioning={positioning} />;
};

const getMenuItems = ({ numberOfItems, isWideItem = false }: { numberOfItems: number; isWideItem?: boolean }) => {
  return Array.from({ length: numberOfItems }, (_, index) =>
    isWideItem ? (
      <MenuItem key={index}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliquar {index}
      </MenuItem>
    ) : (
      <MenuItem key={index}>Item {index}</MenuItem>
    ),
  );
};

const getLongText = ({ width, scrollable }: { width?: number; scrollable?: boolean } = {}) => {
  const style = {
    width,

    ...(scrollable && {
      border: '1px solid red',
      overflowX: 'hidden' as const,
      overflowY: 'auto' as const,
      maxHeight: '300px',
    }),
  };
  return (
    <p style={style}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Nisl pretium fusce id velit ut tortor. Leo vel fringilla est ullamcorper. Eget est lorem ipsum dolor
      sit amet consectetur adipiscing elit. In mollis nunc sed id semper risus in hendrerit gravida. Ullamcorper sit
      amet risus nullam eget felis eget. Dolor sed viverra ipsum nunc aliquet bibendum. Facilisi morbi tempus iaculis
      urna id volutpat. Porta non pulvinar neque laoreet suspendisse. Nunc id cursus metus aliquam eleifend mi in. A
      iaculis at erat pellentesque adipiscing commodo. Proin nibh nisl condimentum id. In hac habitasse platea dictumst
      vestibulum rhoncus est. Non tellus orci ac auctor augue mauris augue neque. Enim nulla aliquet porttitor lacus
      luctus accumsan tortor. Nascetur ridiculus mus mauris vitae ultricies leo integer. Ullamcorper eget nulla facilisi
      etiam dignissim. Leo in vitae turpis massa sed elementum tempus egestas sed. Ut enim blandit volutpat maecenas
      volutpat. Venenatis urna cursus eget nunc scelerisque viverra mauris. Neque aliquam vestibulum morbi blandit.
      Porttitor eget dolor morbi non. Nisi quis eleifend quam adipiscing vitae. Aliquam ultrices sagittis orci a
      scelerisque purus semper. Interdum varius sit amet mattis vulputate enim nulla aliquet. Ut sem viverra aliquet
      eget sit amet tellus cras. Sit amet tellus cras adipiscing enim eu turpis egestas. Amet cursus sit amet dictum sit
      amet justo donec enim. Neque gravida in fermentum et sollicitudin ac. Arcu cursus euismod quis viverra nibh cras
      pulvinar mattis nunc. Ultrices eros in cursus turpis massa tincidunt dui. Nisl rhoncus mattis rhoncus urna neque
      viverra justo. Odio pellentesque diam volutpat commodo sed egestas. Nunc mi ipsum faucibus vitae aliquet nec
      ullamcorper. Ipsum nunc aliquet bibendum enim. Faucibus ornare suspendisse sed nisi lacus sed. Sapien nec sagittis
      aliquam malesuada bibendum arcu vitae elementum. Metus vulputate eu scelerisque felis imperdiet.
    </p>
  );
};

const getWideImages = ({ scrollable } = { scrollable: false }) => {
  return (
    <div
      style={{
        // display: 'flex',
        // gap: 10,
        border: '1px solid green',
        ...(scrollable && {
          overflowX: 'auto' as const,
          maxWidth: 500,
        }),
      }}
    >
      <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/600x200.png" />
      {/* <Image src="https://fabricweb.azureedge.net/fabric-website/placeholders/600x200.png" /> */}
    </div>
  );
};

const PopoverLong = () => {
  return (
    <PopoverAutoSized>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Popover - long</Button>
      </PopoverTrigger>

      <PopoverSurface>{getLongText({ width: 200 })}</PopoverSurface>
    </PopoverAutoSized>
  );
};
const PopoverWide = () => {
  return (
    <PopoverAutoSized>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Popover - wide</Button>
      </PopoverTrigger>

      <PopoverSurface>{getWideImages()}</PopoverSurface>
    </PopoverAutoSized>
  );
};
const PopoverLongWide = () => {
  return (
    <PopoverAutoSized>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Popover - long&wide</Button>
      </PopoverTrigger>

      <PopoverSurface>
        {getWideImages()}
        {getLongText()}
      </PopoverSurface>
    </PopoverAutoSized>
  );
};
const PopoverNestedLong = () => {
  return (
    <PopoverAutoSized>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Popover - nested long</Button>
      </PopoverTrigger>

      <PopoverSurface>
        <PopoverAutoSized>
          <PopoverTrigger disableButtonEnhancement>
            <Button>Nested Popover - long</Button>
          </PopoverTrigger>

          <PopoverSurface>{getLongText({ width: 300 })}</PopoverSurface>
        </PopoverAutoSized>
        {getLongText({ width: 200 })}
      </PopoverSurface>
    </PopoverAutoSized>
  );
};
const PopoverNestedWide = () => {
  return (
    <PopoverAutoSized>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Popover - nested wide</Button>
      </PopoverTrigger>

      <PopoverSurface>
        <PopoverAutoSized>
          <PopoverTrigger disableButtonEnhancement>
            <Button>Nested Popover - wide</Button>
          </PopoverTrigger>

          <PopoverSurface>{getWideImages()}</PopoverSurface>
        </PopoverAutoSized>
        {getWideImages()}
      </PopoverSurface>
    </PopoverAutoSized>
  );
};

const PopoverVerticalScrollable = () => {
  return (
    <PopoverAutoSized>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Popover - vertical scrollable</Button>
      </PopoverTrigger>

      <PopoverSurface>
        <Button>Before</Button>
        {getLongText({ width: 200, scrollable: true })}
        <Button>After</Button>
      </PopoverSurface>
    </PopoverAutoSized>
  );
};
const PopoverHorizontalScrollable = () => {
  return (
    <PopoverAutoSized>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Popover - horizontal scrollable</Button>
      </PopoverTrigger>

      <PopoverSurface>
        <Button>Before</Button>
        {getWideImages({ scrollable: true })}
        <Button>After</Button>
      </PopoverSurface>
    </PopoverAutoSized>
  );
};

const MenuLong = () => {
  return (
    <MenuAutoSized>
      <MenuTrigger disableButtonEnhancement>
        <Button>Menu - long</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>{getMenuItems({ numberOfItems: 20 })}</MenuList>
      </MenuPopover>
    </MenuAutoSized>
  );
};
const MenuWide = () => {
  return (
    <MenuAutoSized>
      <MenuTrigger disableButtonEnhancement>
        <Button>Menu - wide</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>{getMenuItems({ numberOfItems: 3, isWideItem: true })}</MenuList>
      </MenuPopover>
    </MenuAutoSized>
  );
};
const MenuLongWide = () => {
  return (
    <MenuAutoSized>
      <MenuTrigger disableButtonEnhancement>
        <Button>Menu - long&wide</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>{getMenuItems({ numberOfItems: 20, isWideItem: true })}</MenuList>
      </MenuPopover>
    </MenuAutoSized>
  );
};
const MenuNestedLong = () => {
  return (
    <MenuAutoSized>
      <MenuTrigger disableButtonEnhancement>
        <Button>Menu - nested long</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {getMenuItems({ numberOfItems: 20 })}
          <MenuAutoSized>
            <MenuTrigger disableButtonEnhancement>
              <MenuItem>nested Menu - long</MenuItem>
            </MenuTrigger>

            <MenuPopover>
              <MenuList>{getMenuItems({ numberOfItems: 20 })}</MenuList>
            </MenuPopover>
          </MenuAutoSized>
        </MenuList>
      </MenuPopover>
    </MenuAutoSized>
  );
};
const MenuNestedWide = () => {
  return (
    <MenuAutoSized>
      <MenuTrigger disableButtonEnhancement>
        <Button>Menu - nested wide</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuAutoSized>
            <MenuTrigger disableButtonEnhancement>
              <MenuItem>nested Menu - wide</MenuItem>
            </MenuTrigger>

            <MenuPopover>
              <MenuList>{getMenuItems({ numberOfItems: 3, isWideItem: true })}</MenuList>
            </MenuPopover>
          </MenuAutoSized>
          {getMenuItems({ numberOfItems: 3, isWideItem: true })}
        </MenuList>
      </MenuPopover>
    </MenuAutoSized>
  );
};

const MenuVerticalScrollable = () => {
  return (
    <MenuAutoSized>
      <MenuTrigger disableButtonEnhancement>
        <Button>Menu - vertical scrollable</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem key={'Before'}>Before</MenuItem>

          <MenuDivider />

          <MenuGroup
            style={{
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: 300,
            }}
          >
            {getMenuItems({ numberOfItems: 20 })}
          </MenuGroup>

          <MenuDivider />

          <MenuItem key={'After'}>After</MenuItem>
        </MenuList>
      </MenuPopover>
    </MenuAutoSized>
  );
};

const options = [
  { name: 'Popover - long', story: <PopoverLong /> },
  { name: 'Popover - wide', story: <PopoverWide /> },
  { name: 'Popover - long&wide', story: <PopoverLongWide /> },
  { name: 'Popover - nested long', story: <PopoverNestedLong /> },
  { name: 'Popover - nested wide', story: <PopoverNestedWide /> },
  { name: 'Popover - vertical scrollable', story: <PopoverVerticalScrollable /> },
  { name: 'Popover - horizontal scrollable', story: <PopoverHorizontalScrollable /> },
  // TODO: menu has max width 300 - does it mean it will never have horizontal scrollbar since we have 320px as smallest?
  { name: 'Menu - long', story: <MenuLong /> },
  { name: 'Menu - wide', story: <MenuWide /> },
  { name: 'Menu - long&wide', story: <MenuLongWide /> },
  { name: 'Menu - nested long', story: <MenuNestedLong /> },
  { name: 'Menu - nested wide', story: <MenuNestedWide /> },
  { name: 'Menu - vertical scrollable', story: <MenuVerticalScrollable /> },
];

export const AutoSizeExperiment = () => {
  const [value, setValue] = React.useState(options[0].name);

  const onOptionSelect: DropdownProps['onOptionSelect'] = (_ev, data) => {
    setValue(data.optionText ?? '');
  };

  return (
    <>
      <Dropdown placeholder="Select a story" value={value} selectedOptions={[value]} onOptionSelect={onOptionSelect}>
        {options.map(option => (
          <Option key={option.name}>{option.name}</Option>
        ))}
      </Dropdown>
      <br />
      {options.find(option => option.name === value)?.story}
    </>
  );
};
