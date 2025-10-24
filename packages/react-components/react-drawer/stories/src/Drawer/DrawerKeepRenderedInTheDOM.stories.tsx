import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  DrawerProps,
  Button,
  Label,
  Radio,
  RadioGroup,
  makeStyles,
  tokens,
  useId,
  useRestoreFocusSource,
  useRestoreFocusTarget,
  ToggleButton,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    border: '2px solid #ccc',
    overflow: 'hidden',

    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },

  content: {
    flex: '1',
    padding: '16px',

    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gridRowGap: tokens.spacingVerticalXXL,
    gridAutoRows: 'max-content',
  },

  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },
});

type DrawerType = Required<DrawerProps>['type'];

export const KeepRenderedInTheDOM = (): JSXElement => {
  const styles = useStyles();
  const labelId = useId('type-label');

  const [isOpen, setIsOpen] = React.useState(false);
  const [type, setType] = React.useState<DrawerType>('overlay');

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div className={styles.root}>
      <Drawer
        {...restoreFocusSourceAttributes}
        type={type}
        separator
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
        unmountOnClose={false}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Default Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Nisl pretium fusce id velit ut tortor. Leo vel fringilla est ullamcorper. Eget est
            lorem ipsum dolor sit amet consectetur adipiscing elit. In mollis nunc sed id semper risus in hendrerit
            gravida. Ullamcorper sit amet risus nullam eget felis eget. Dolor sed viverra ipsum nunc aliquet bibendum.
            Facilisi morbi tempus iaculis urna id volutpat. Porta non pulvinar neque laoreet suspendisse. Nunc id cursus
            metus aliquam eleifend mi in. A iaculis at erat pellentesque adipiscing commodo. Proin nibh nisl condimentum
            id. In hac habitasse platea dictumst vestibulum rhoncus est. Non tellus orci ac auctor augue mauris augue
            neque. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Nascetur ridiculus mus mauris vitae
            ultricies leo integer. Ullamcorper eget nulla facilisi etiam dignissim. Leo in vitae turpis massa sed
            elementum tempus egestas sed.
          </p>

          <p>
            Ut enim blandit volutpat maecenas volutpat. Venenatis urna cursus eget nunc scelerisque viverra mauris.
            Neque aliquam vestibulum morbi blandit. Porttitor eget dolor morbi non. Nisi quis eleifend quam adipiscing
            vitae. Aliquam ultrices sagittis orci a scelerisque purus semper. Interdum varius sit amet mattis vulputate
            enim nulla aliquet. Ut sem viverra aliquet eget sit amet tellus cras. Sit amet tellus cras adipiscing enim
            eu turpis egestas. Amet cursus sit amet dictum sit amet justo donec enim. Neque gravida in fermentum et
            sollicitudin ac. Arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc. Ultrices eros in cursus
            turpis massa tincidunt dui. Nisl rhoncus mattis rhoncus urna neque viverra justo. Odio pellentesque diam
            volutpat commodo sed egestas. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Ipsum nunc aliquet
            bibendum enim. Faucibus ornare suspendisse sed nisi lacus sed. Sapien nec sagittis aliquam malesuada
            bibendum arcu vitae elementum. Metus vulputate eu scelerisque felis imperdiet.
          </p>

          <p>
            Consequat interdum varius sit amet mattis vulputate enim. Amet cursus sit amet dictum sit amet justo. Eget
            aliquet nibh praesent tristique magna sit. Ut consequat semper viverra nam libero justo. Pharetra massa
            massa ultricies mi. Sem viverra aliquet eget sit amet. Pulvinar mattis nunc sed blandit libero volutpat sed.
            Pharetra diam sit amet nisl suscipit adipiscing bibendum. Consectetur adipiscing elit ut aliquam. Volutpat
            diam ut venenatis tellus in metus vulputate. Scelerisque in dictum non consectetur a erat. Venenatis lectus
            magna fringilla urna porttitor rhoncus. Vitae congue mauris rhoncus aenean vel elit. Neque laoreet
            suspendisse interdum consectetur. Ultrices gravida dictum fusce ut placerat orci. Bibendum ut tristique et
            egestas quis ipsum suspendisse. Mattis rhoncus urna neque viverra justo nec ultrices dui. Elit duis
            tristique sollicitudin nibh sit amet.
          </p>

          <p>
            At risus viverra adipiscing at. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit.
            Nunc vel risus commodo viverra maecenas. Sit amet est placerat in egestas erat imperdiet sed euismod. Turpis
            egestas maecenas pharetra convallis posuere. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor
            aliquam. Dolor sit amet consectetur adipiscing elit. Aliquam purus sit amet luctus venenatis lectus magna
            fringilla. Scelerisque fermentum dui faucibus in ornare quam viverra. Egestas maecenas pharetra convallis
            posuere morbi leo urna. A diam sollicitudin tempor id eu nisl nunc. Lectus sit amet est placerat.
          </p>

          <p>
            Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. At tellus at urna condimentum
            mattis pellentesque id nibh. Dui faucibus in ornare quam. Tincidunt id aliquet risus feugiat in ante metus
            dictum. Adipiscing commodo elit at imperdiet dui. Dolor sed viverra ipsum nunc. Sodales neque sodales ut
            etiam sit amet nisl. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Mattis molestie a iaculis at
            erat pellentesque adipiscing. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla.
            Fringilla urna porttitor rhoncus dolor purus.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Nisl pretium fusce id velit ut tortor. Leo vel fringilla est ullamcorper. Eget est
            lorem ipsum dolor sit amet consectetur adipiscing elit. In mollis nunc sed id semper risus in hendrerit
            gravida. Ullamcorper sit amet risus nullam eget felis eget. Dolor sed viverra ipsum nunc aliquet bibendum.
            Facilisi morbi tempus iaculis urna id volutpat. Porta non pulvinar neque laoreet suspendisse. Nunc id cursus
            metus aliquam eleifend mi in. A iaculis at erat pellentesque adipiscing commodo. Proin nibh nisl condimentum
            id. In hac habitasse platea dictumst vestibulum rhoncus est. Non tellus orci ac auctor augue mauris augue
            neque. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Nascetur ridiculus mus mauris vitae
            ultricies leo integer. Ullamcorper eget nulla facilisi etiam dignissim. Leo in vitae turpis massa sed
            elementum tempus egestas sed.
          </p>

          <p>
            Ut enim blandit volutpat maecenas volutpat. Venenatis urna cursus eget nunc scelerisque viverra mauris.
            Neque aliquam vestibulum morbi blandit. Porttitor eget dolor morbi non. Nisi quis eleifend quam adipiscing
            vitae. Aliquam ultrices sagittis orci a scelerisque purus semper. Interdum varius sit amet mattis vulputate
            enim nulla aliquet. Ut sem viverra aliquet eget sit amet tellus cras. Sit amet tellus cras adipiscing enim
            eu turpis egestas. Amet cursus sit amet dictum sit amet justo donec enim. Neque gravida in fermentum et
            sollicitudin ac. Arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc. Ultrices eros in cursus
            turpis massa tincidunt dui. Nisl rhoncus mattis rhoncus urna neque viverra justo. Odio pellentesque diam
            volutpat commodo sed egestas. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Ipsum nunc aliquet
            bibendum enim. Faucibus ornare suspendisse sed nisi lacus sed. Sapien nec sagittis aliquam malesuada
            bibendum arcu vitae elementum. Metus vulputate eu scelerisque felis imperdiet.
          </p>

          <p>
            Consequat interdum varius sit amet mattis vulputate enim. Amet cursus sit amet dictum sit amet justo. Eget
            aliquet nibh praesent tristique magna sit. Ut consequat semper viverra nam libero justo. Pharetra massa
            massa ultricies mi. Sem viverra aliquet eget sit amet. Pulvinar mattis nunc sed blandit libero volutpat sed.
            Pharetra diam sit amet nisl suscipit adipiscing bibendum. Consectetur adipiscing elit ut aliquam. Volutpat
            diam ut venenatis tellus in metus vulputate. Scelerisque in dictum non consectetur a erat. Venenatis lectus
            magna fringilla urna porttitor rhoncus. Vitae congue mauris rhoncus aenean vel elit. Neque laoreet
            suspendisse interdum consectetur. Ultrices gravida dictum fusce ut placerat orci. Bibendum ut tristique et
            egestas quis ipsum suspendisse. Mattis rhoncus urna neque viverra justo nec ultrices dui. Elit duis
            tristique sollicitudin nibh sit amet.
          </p>
        </DrawerBody>
      </Drawer>

      <div className={styles.content}>
        {type === 'inline' ? (
          <ToggleButton
            {...restoreFocusTargetAttributes}
            appearance="primary"
            onClick={() => setIsOpen(!isOpen)}
            checked={isOpen}
          >
            Toggle
          </ToggleButton>
        ) : (
          <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setIsOpen(!isOpen)}>
            Open
          </Button>
        )}

        <div className={styles.field}>
          <Label id={labelId}>Type</Label>
          <RadioGroup value={type} onChange={(_, data) => setType(data.value as DrawerType)} aria-labelledby={labelId}>
            <Radio value="overlay" label="Overlay (Default)" />
            <Radio value="inline" label="Inline" />
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
