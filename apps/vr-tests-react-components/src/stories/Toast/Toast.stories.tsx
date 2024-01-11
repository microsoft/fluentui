import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import {
  Toast,
  ToastTitle,
  ToastBody,
  ToastFooter,
  Toaster,
  useToastController,
  ToastStatus,
} from '@fluentui/react-toast';
import { Link } from '@fluentui/react-link';
import { Steps, StoryWright } from 'storywright';
import { DARK_MODE, HIGH_CONTRAST, RTL, getStoryVariant } from '../../utilities/getStoryVariant';

export default {
  title: 'Toast',
  decorators: [
    Story => (
      <StoryWright steps={new Steps().click('#dispatch').wait('[data-toast-visible]').snapshot('Toast visible').end()}>
        <Story />
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Toast>;

const toastIntents = ['success', 'warning', 'info', 'error'] as const;

const useToastScreenshotData = () => {
  const [toasts] = React.useState(() => new Set<HTMLElement>());
  const toastRef = React.useCallback(
    (el: HTMLElement | null) => {
      if (el) {
        toasts.add(el);
      }
    },
    [toasts],
  );

  const onStatusChange = (e: null, data: { status: ToastStatus }) => {
    if (data.status === 'visible') {
      for (const toast of toasts) {
        toast.setAttribute('data-toast-visible', '');
      }
    }
  };

  React.useEffect(() => {
    () => toasts.clear();
  }, [toasts]);

  return {
    toastRef,
    onStatusChange,
  };
};

export const FullToast = () => {
  const { dispatchToast } = useToastController();
  const { toastRef, onStatusChange } = useToastScreenshotData();
  const dispatchToasts = () => {
    for (const intent of toastIntents) {
      dispatchToast(
        <Toast ref={toastRef}>
          <ToastTitle action={<Link>Action</Link>}>This is a toast</ToastTitle>
          <ToastBody subtitle="This is a toast">This is a toast</ToastBody>
          <ToastFooter>
            <Link>Action</Link>
            <Link>Action</Link>
          </ToastFooter>
        </Toast>,
        {
          intent,
          timeout: -1,
          onStatusChange,
        },
      );
    }
  };
  return (
    <>
      <button id="dispatch" onClick={dispatchToasts}>
        Dispatch toasts
      </button>
      <Toaster />
    </>
  );
};

export const FullToastDarkMode = getStoryVariant(FullToast, DARK_MODE);
export const FullToastHighContrastMode = getStoryVariant(FullToast, HIGH_CONTRAST);
export const FullToastRTL = getStoryVariant(FullToast, RTL);

export const WithoutSubtitle = () => {
  const { dispatchToast } = useToastController();
  const { toastRef, onStatusChange } = useToastScreenshotData();
  const dispatchToasts = () => {
    for (const intent of toastIntents) {
      dispatchToast(
        <Toast ref={toastRef}>
          <ToastTitle action={<Link>Action</Link>}>This is a toast</ToastTitle>
          <ToastBody>This is a toast</ToastBody>
          <ToastFooter>
            <Link>Action</Link>
            <Link>Action</Link>
          </ToastFooter>
        </Toast>,
        { intent, timeout: -1, onStatusChange },
      );
    }
  };
  return (
    <>
      <button id="dispatch" onClick={dispatchToasts}>
        Dispatch toasts
      </button>
      <Toaster />
    </>
  );
};

export const WithoutSubtitleDarkMode = getStoryVariant(WithoutSubtitle, DARK_MODE);
export const WithoutSubtitleHighContrastMode = getStoryVariant(WithoutSubtitle, HIGH_CONTRAST);
export const WithoutSubtitleRTL = getStoryVariant(WithoutSubtitle, RTL);

export const TitleOnly = () => {
  const { dispatchToast } = useToastController();
  const { toastRef, onStatusChange } = useToastScreenshotData();
  const dispatchToasts = () => {
    for (const intent of toastIntents) {
      dispatchToast(
        <Toast ref={toastRef}>
          <ToastTitle action={<Link>Action</Link>}>This is a toast</ToastTitle>
        </Toast>,
        { intent, onStatusChange, timeout: -1 },
      );
    }
  };
  return (
    <>
      <button id="dispatch" onClick={dispatchToasts}>
        Dispatch toasts
      </button>
      <Toaster />
    </>
  );
};

export const TitleOnlyDarkMode = getStoryVariant(TitleOnly, DARK_MODE);
export const TitleOnlyHighContrastMode = getStoryVariant(TitleOnly, HIGH_CONTRAST);
export const TitleOnlyRTL = getStoryVariant(TitleOnly, RTL);

export const FullToastInverted = () => {
  const { dispatchToast } = useToastController();
  const { toastRef, onStatusChange } = useToastScreenshotData();
  const dispatchToasts = () => {
    for (const intent of toastIntents) {
      dispatchToast(
        <Toast ref={toastRef} appearance="inverted">
          <ToastTitle action={<Link>Action</Link>}>This is a toast</ToastTitle>
          <ToastBody subtitle="This is a toast">This is a toast</ToastBody>
          <ToastFooter>
            <Link>Action</Link>
            <Link>Action</Link>
          </ToastFooter>
        </Toast>,
        {
          intent,
          timeout: -1,
          onStatusChange,
        },
      );
    }
  };
  return (
    <>
      <button id="dispatch" onClick={dispatchToasts}>
        Dispatch toasts
      </button>
      <Toaster />
    </>
  );
};

export const FullToastInvertedDarkMode = getStoryVariant(FullToastInverted, DARK_MODE);
export const FullToastInvertedHighContrastMode = getStoryVariant(FullToastInverted, HIGH_CONTRAST);

export const WithoutSubtitleInverted = () => {
  const { dispatchToast } = useToastController();
  const { toastRef, onStatusChange } = useToastScreenshotData();
  const dispatchToasts = () => {
    for (const intent of toastIntents) {
      dispatchToast(
        <Toast appearance="inverted" ref={toastRef}>
          <ToastTitle action={<Link>Action</Link>}>This is a toast</ToastTitle>
          <ToastBody>This is a toast</ToastBody>
          <ToastFooter>
            <Link>Action</Link>
            <Link>Action</Link>
          </ToastFooter>
        </Toast>,
        { intent, timeout: -1, onStatusChange },
      );
    }
  };
  return (
    <>
      <button id="dispatch" onClick={dispatchToasts}>
        Dispatch toasts
      </button>
      <Toaster />
    </>
  );
};

export const WithoutSubtitleInvertedDarkMode = getStoryVariant(WithoutSubtitleInverted, DARK_MODE);
export const WithoutSubtitleInvertedHighContrastMode = getStoryVariant(WithoutSubtitleInverted, HIGH_CONTRAST);

export const TitleOnlyInverted = () => {
  const { dispatchToast } = useToastController();
  const { toastRef, onStatusChange } = useToastScreenshotData();
  const dispatchToasts = () => {
    for (const intent of toastIntents) {
      dispatchToast(
        <Toast appearance="inverted" ref={toastRef}>
          <ToastTitle action={<Link>Action</Link>}>This is a toast</ToastTitle>
        </Toast>,
        { intent, onStatusChange, timeout: -1 },
      );
    }
  };
  return (
    <>
      <button id="dispatch" onClick={dispatchToasts}>
        Dispatch toasts
      </button>
      <Toaster />
    </>
  );
};

export const TitleOnlyInvertedDarkMode = getStoryVariant(TitleOnlyInverted, DARK_MODE);
export const TitleOnlyInvertedHighContrastMode = getStoryVariant(TitleOnlyInverted, HIGH_CONTRAST);

export const ToastTitleWordBreak = () => {
  const { dispatchToast } = useToastController();
  const { toastRef, onStatusChange } = useToastScreenshotData();
  const dispatchToasts = () => {
    dispatchToast(
      <Toast ref={toastRef}>
        <ToastTitle action={<Link>Action</Link>}>
          This is a really long messagexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        </ToastTitle>
      </Toast>,
      {
        onStatusChange,
        timeout: -1,
      },
    );
  };
  return (
    <>
      <button id="dispatch" onClick={dispatchToasts}>
        Dispatch toasts
      </button>
      <Toaster />
    </>
  );
};

export const ToastBodyWordBreak = () => {
  const { dispatchToast } = useToastController();
  const { toastRef, onStatusChange } = useToastScreenshotData();
  const dispatchToasts = () => {
    dispatchToast(
      <Toast ref={toastRef}>
        <ToastBody>This is a really long messagexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</ToastBody>
      </Toast>,
      {
        onStatusChange,
        timeout: -1,
      },
    );
  };
  return (
    <>
      <button id="dispatch" onClick={dispatchToasts}>
        Dispatch toasts
      </button>
      <Toaster />
    </>
  );
};
