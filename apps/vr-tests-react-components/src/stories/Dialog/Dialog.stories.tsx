import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-button';
import { Combobox, Option } from '@fluentui/react-combobox';
import { Rocket24Regular } from '@fluentui/react-icons';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';

export default {
  title: 'Dialog',
} as ComponentMeta<typeof Dialog>;

export const Default = () => (
  <Dialog open>
    <DialogTrigger>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogSurface>
      <DialogBody>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est
          dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque
          eaque?
        </DialogContent>
        <DialogActions>
          <DialogTrigger>
            <Button appearance="secondary">Close</Button>
          </DialogTrigger>
          <Button appearance="primary">Do Something</Button>
        </DialogActions>
      </DialogBody>
    </DialogSurface>
  </Dialog>
);

Default.storyName = 'default';

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);
export const DefaultRTL = getStoryVariant(Default, RTL);

export const NonModal = () => (
  <Dialog open modalType="non-modal">
    <DialogTrigger>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogSurface>
      <DialogBody>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est
          dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque
          eaque?
        </DialogContent>
        <DialogActions>
          <DialogTrigger>
            <Button appearance="secondary">Close</Button>
          </DialogTrigger>
          <Button appearance="primary">Do Something</Button>
        </DialogActions>
      </DialogBody>
    </DialogSurface>
  </Dialog>
);

NonModal.storyName = 'non-modal';

export const NonModalDarkMode = getStoryVariant(NonModal, DARK_MODE);
export const NonModalHighContrast = getStoryVariant(NonModal, HIGH_CONTRAST);
export const NonModalRTL = getStoryVariant(NonModal, RTL);

export const Alert = () => (
  <Dialog open modalType="alert">
    <DialogTrigger>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogSurface>
      <DialogBody>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est
          dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque
          eaque?
        </DialogContent>
        <DialogActions>
          <DialogTrigger>
            <Button appearance="secondary">Close</Button>
          </DialogTrigger>
          <Button appearance="primary">Do Something</Button>
        </DialogActions>
      </DialogBody>
    </DialogSurface>
  </Dialog>
);

Alert.storyName = 'alert';

export const AlertDarkMode = getStoryVariant(Alert, DARK_MODE);
export const AlertHighContrast = getStoryVariant(Alert, HIGH_CONTRAST);
export const AlertRTL = getStoryVariant(Alert, RTL);

export const ActionsPositionStart = () => (
  <Dialog open>
    <DialogTrigger>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogSurface>
      <DialogBody>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est
          dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque
          eaque?
        </DialogContent>
        <DialogActions position="start">
          <DialogTrigger>
            <Button appearance="secondary">Close</Button>
          </DialogTrigger>
          <Button appearance="primary">Do Something</Button>
        </DialogActions>
      </DialogBody>
    </DialogSurface>
  </Dialog>
);

ActionsPositionStart.storyName = 'actions position start';

export const ActionsPositionStartDarkMode = getStoryVariant(ActionsPositionStart, DARK_MODE);
export const ActionsPositionStartHighContrast = getStoryVariant(ActionsPositionStart, HIGH_CONTRAST);
export const ActionsPositionStartRTL = getStoryVariant(ActionsPositionStart, RTL);

export const ActionsPositionStartPositionEnd = () => (
  <Dialog open>
    <DialogTrigger>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogSurface>
      <DialogBody>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est
          dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque
          eaque?
        </DialogContent>
        <DialogActions position="start">
          <DialogTrigger>
            <Button appearance="secondary">Some action</Button>
          </DialogTrigger>
        </DialogActions>
        <DialogActions position="end">
          <DialogTrigger>
            <Button appearance="secondary">Close</Button>
          </DialogTrigger>
          <Button appearance="primary">Do Something</Button>
        </DialogActions>
      </DialogBody>
    </DialogSurface>
  </Dialog>
);

ActionsPositionStartPositionEnd.storyName = 'actions position start & position end';

export const ActionsPositionStartPositionEndDarkMode = getStoryVariant(ActionsPositionStartPositionEnd, DARK_MODE);
export const ActionsPositionStartPositionEndHighContrast = getStoryVariant(
  ActionsPositionStartPositionEnd,
  HIGH_CONTRAST,
);
export const ActionsPositionStartPositionEndRTL = getStoryVariant(ActionsPositionStartPositionEnd, RTL);

export const NoActions = () => (
  <Dialog open>
    <DialogTrigger>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogSurface>
      <DialogBody>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est
          dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque
          eaque?
        </DialogContent>
      </DialogBody>
    </DialogSurface>
  </Dialog>
);

NoActions.storyName = 'no actions';

export const NoActionsDarkMode = getStoryVariant(NoActions, DARK_MODE);
export const NoActionsHighContrast = getStoryVariant(NoActions, HIGH_CONTRAST);
export const NoActionsRTL = getStoryVariant(NoActions, RTL);

export const NoTitle = () => (
  <Dialog open>
    <DialogTrigger>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogSurface>
      <DialogBody>
        <DialogContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est
          dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque
          eaque?
        </DialogContent>
        <DialogActions>
          <DialogTrigger>
            <Button appearance="secondary">Close</Button>
          </DialogTrigger>
          <Button appearance="primary">Do Something</Button>
        </DialogActions>
      </DialogBody>
    </DialogSurface>
  </Dialog>
);

NoTitle.storyName = 'no title';

export const NoTitleDarkMode = getStoryVariant(NoTitle, DARK_MODE);
export const NoTitleHighContrast = getStoryVariant(NoTitle, HIGH_CONTRAST);
export const NoTitleRTL = getStoryVariant(NoTitle, RTL);

export const NoTitleNoActions = () => (
  <Dialog open>
    <DialogTrigger>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogSurface>
      <DialogBody>
        <DialogContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est
          dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque
          eaque?
        </DialogContent>
      </DialogBody>
    </DialogSurface>
  </Dialog>
);

NoTitleNoActions.storyName = 'no title & no actions';

export const NoTitleNoActionsDarkMode = getStoryVariant(NoTitleNoActions, DARK_MODE);
export const NoTitleNoActionsHighContrast = getStoryVariant(NoTitleNoActions, HIGH_CONTRAST);
export const NoTitleNoActionsRTL = getStoryVariant(NoTitleNoActions, RTL);

export const TitleCustomAction = () => (
  <Dialog open>
    <DialogTrigger>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogSurface>
      <DialogBody>
        <DialogTitle action={<Button appearance="subtle" aria-label="fly" icon={<Rocket24Regular />} />}>
          Dialog title
        </DialogTitle>
        <DialogContent>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo repudiandae impedit doloribus
          laborum quidem maxime dolores perspiciatis non ipsam, nostrum commodi quis autem sequi, incidunt cum?
          Consequuntur, repellendus nostrum?
        </DialogContent>
      </DialogBody>
    </DialogSurface>
  </Dialog>
);

TitleCustomAction.storyName = 'title custom action';

export const TitleCustomActionDarkMode = getStoryVariant(TitleCustomAction, DARK_MODE);
export const TitleCustomActionHighContrast = getStoryVariant(TitleCustomAction, HIGH_CONTRAST);
export const TitleCustomActionRTL = getStoryVariant(TitleCustomAction, RTL);

export const Nested = () => (
  <Dialog open>
    <DialogTrigger>
      <Button>Open nested dialog</Button>
    </DialogTrigger>
    <DialogSurface as="div">
      <DialogBody>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogActions>
          <Dialog open>
            <DialogTrigger>
              <Button appearance="primary">Open inner dialog</Button>
            </DialogTrigger>
            <DialogSurface as="div">
              <DialogBody>
                <DialogTitle>Inner dialog title</DialogTitle>
                <DialogContent>⛔️ just because you can doesn't mean you should have nested dialogs ⛔️</DialogContent>
                <DialogActions>
                  <DialogTrigger>
                    <Button appearance="primary">Close</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        </DialogActions>
      </DialogBody>
    </DialogSurface>
  </Dialog>
);

Nested.storyName = 'nested';

export const NestedDarkMode = getStoryVariant(Nested, DARK_MODE);
export const NestedHighContrast = getStoryVariant(Nested, HIGH_CONTRAST);
export const NestedRTL = getStoryVariant(Nested, RTL);

export const ScrollLongContent = () => (
  <Dialog open>
    <DialogTrigger>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogSurface>
      <DialogBody>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <DialogTrigger>
            <Button appearance="secondary">Close</Button>
          </DialogTrigger>
          <Button appearance="primary">Do Something</Button>
        </DialogActions>
      </DialogBody>
    </DialogSurface>
  </Dialog>
);

ScrollLongContent.storyName = 'scroll long content';

export const ScrollLongContentDarkMode = getStoryVariant(ScrollLongContent, DARK_MODE);
export const ScrollLongContentHighContrast = getStoryVariant(ScrollLongContent, HIGH_CONTRAST);
export const ScrollLongContentRTL = getStoryVariant(ScrollLongContent, RTL);

export const FluidActionsStart = () => {
  return (
    <Dialog open>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
            est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
            cumque eaque?
          </DialogContent>
          <DialogActions fluid position="start">
            <Button appearance="secondary">Something Else</Button>
            <Button appearance="secondary">Something Else</Button>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export const FluidActionsEnd = () => {
  return (
    <Dialog open>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
            est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
            cumque eaque?
          </DialogContent>
          <DialogActions fluid position="end">
            <Button appearance="secondary">Something Else</Button>
            <Button appearance="secondary">Something Else</Button>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export const IntegrationComboboxInline = () => {
  return (
    <Dialog open>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Dialog title</DialogTitle>
          {/* Forces the dialog not to be scrollable, so combobox options are not cut off */}
          <DialogContent style={{ overflow: 'visible' }}>
            {/* "inlinePopup" renders the popup in the DOM tree of the dialog, so it's inside the dialog's boundary */}
            <Combobox open inlinePopup placeholder="Select an animal">
              {['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'].map(option => (
                <Option key={option} disabled={option === 'Ferret'}>
                  {option}
                </Option>
              ))}
            </Combobox>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
