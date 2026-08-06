import * as React from 'react';
import { CompoundButton } from '@fluentui/react-headless-components-preview/compound-button';
import { AddRegular, ArrowDownloadRegular, DeleteRegular, OpenRegular, SettingsRegular } from '@fluentui/react-icons';
import { expect, userEvent, within } from 'storybook/test';

import styles from './compound-button.module.css';

export const Default = (): React.ReactNode => {
  const [completedActions, setCompletedActions] = React.useState(0);

  const iconSlot = (icon: React.ReactNode) => ({
    children: icon,
    className: styles.actionIcon,
  });

  const contentContainerSlot = {
    className: styles.actionContent,
  };

  const secondaryContentSlot = (children: React.ReactNode) => ({
    children,
    className: styles.actionSecondary,
  });

  return (
    <div className={styles.demo}>
      <div className={styles.introduction}>
        <p className={styles.eyebrow}>Deployment workspace</p>
        <h2 className={styles.heading}>Compound actions</h2>
        <p className={styles.summary}>
          One semantic component, styled here as a compact action system with CSS Modules.
        </p>
      </div>

      <output className={styles.status} role="status" aria-live="polite">
        Actions completed: {completedActions}
      </output>

      <div className={styles.actions}>
        <CompoundButton
          className={styles.action}
          icon={iconSlot(<ArrowDownloadRegular aria-hidden />)}
          contentContainer={contentContainerSlot}
          secondaryContent={secondaryContentSlot('Starts a new deployment')}
          onClick={() => setCompletedActions(value => value + 1)}
        >
          Create release
        </CompoundButton>

        <CompoundButton
          as="a"
          href="#release-details"
          className={`${styles.action} ${styles.anchorAction}`}
          icon={iconSlot(<OpenRegular aria-hidden />)}
          contentContainer={contentContainerSlot}
          secondaryContent={secondaryContentSlot('Opens release details')}
        >
          Review release
        </CompoundButton>

        <CompoundButton
          className={styles.action}
          icon={iconSlot(<DeleteRegular aria-hidden />)}
          contentContainer={contentContainerSlot}
          secondaryContent={secondaryContentSlot('Unavailable while deployment is active')}
          disabled
          onClick={() => setCompletedActions(value => value + 1)}
        >
          Delete release
        </CompoundButton>

        <CompoundButton
          className={styles.action}
          icon={iconSlot(<SettingsRegular aria-hidden />)}
          contentContainer={contentContainerSlot}
          secondaryContent={secondaryContentSlot('Focusable for feature discovery')}
          disabledFocusable
        >
          Configure policy
        </CompoundButton>

        <CompoundButton
          className={`${styles.action} ${styles.iconAction}`}
          icon={iconSlot(<AddRegular aria-hidden />)}
          aria-label="Add deployment target"
        />
      </div>
    </div>
  );
};

Default.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const enabledAction = canvas.getByRole('button', {
    name: 'Create release Starts a new deployment',
  });
  const disabledAction = canvas.getByRole('button', {
    name: 'Delete release Unavailable while deployment is active',
  });
  const disabledFocusableAction = canvas.getByRole('button', {
    name: 'Configure policy Focusable for feature discovery',
  });
  const anchorAction = canvas.getByRole('link', {
    name: 'Review release Opens release details',
  });
  const iconOnlyAction = canvas.getByRole('button', {
    name: 'Add deployment target',
  });
  const status = canvas.getByRole('status');

  await expect(enabledAction).toHaveAttribute('data-has-secondary-content', '');
  await expect(enabledAction).not.toHaveAttribute('data-disabled');
  await expect(anchorAction).toHaveAttribute('href', '#release-details');
  await expect(anchorAction).toHaveAttribute('data-has-secondary-content', '');
  await expect(disabledAction).toBeDisabled();
  await expect(disabledAction).toHaveAttribute('disabled');
  await expect(disabledAction).toHaveAttribute('data-disabled', '');
  await expect(disabledFocusableAction).not.toBeDisabled();
  await expect(disabledFocusableAction).toHaveAttribute('aria-disabled', 'true');
  await expect(disabledFocusableAction).toHaveAttribute('data-disabled-focusable', '');
  await expect(iconOnlyAction).toHaveAttribute('data-icon-only', '');
  await expect(iconOnlyAction).not.toHaveAttribute('data-has-secondary-content');

  await expect(status).toHaveTextContent('Actions completed: 0');
  await userEvent.click(enabledAction);
  await expect(status).toHaveTextContent('Actions completed: 1');
  await userEvent.click(disabledAction);
  await expect(status).toHaveTextContent('Actions completed: 1');
};
