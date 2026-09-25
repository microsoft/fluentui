import * as React from 'react';
import { Button, Field, ProgressBar } from '@fluentui/react-components';
import { ChevronDownRegular, DismissRegular, SendRegular } from '@fluentui/react-icons';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogHeader,
  DialogSurface,
  DialogTitle,
} from '@fluentui/react-headless-components-preview/dialog';
import { Dropdown, Option } from '@fluentui/react-headless-components-preview/dropdown';
import { Input } from '@fluentui/react-headless-components-preview/input';
import { Textarea } from '@fluentui/react-headless-components-preview/textarea';

import { communities, flairOptions } from '../data/forumData';
import { useAppStyles, useHeadlessStyles } from '../styles';
import type { NewPost } from '../types';

type PostComposerProps = {
  open: boolean;
  defaultCommunityId: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (post: NewPost) => void;
};

type ComposerValues = {
  title: string;
  body: string;
  communityId: string;
  flair: string;
};

const emptyValues: ComposerValues = {
  title: '',
  body: '',
  communityId: '',
  flair: '',
};

export function PostComposer(props: PostComposerProps): React.ReactElement {
  const styles = useAppStyles();
  const headless = useHeadlessStyles();
  const [values, setValues] = React.useState<ComposerValues>(emptyValues);
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (props.open) {
      setValues({
        ...emptyValues,
        communityId: props.defaultCommunityId === 'all' ? '' : props.defaultCommunityId,
      });
      setSubmitted(false);
    }
  }, [props.defaultCommunityId, props.open]);

  const titleInvalid = submitted && values.title.trim().length < 8;
  const bodyInvalid = submitted && values.body.trim().length < 20;
  const communityInvalid = submitted && !values.communityId;
  const flairInvalid = submitted && !values.flair;
  const completedFields = [
    values.title.trim().length >= 8,
    values.body.trim().length >= 20,
    values.communityId,
    values.flair,
  ].filter(Boolean).length;

  const submit = () => {
    setSubmitted(true);
    if (titleInvalid || bodyInvalid || communityInvalid || flairInvalid) {
      return;
    }
    if (values.title.trim().length < 8 || values.body.trim().length < 20 || !values.communityId || !values.flair) {
      return;
    }
    props.onSubmit({
      title: values.title.trim(),
      body: values.body.trim(),
      communityId: values.communityId,
      flair: values.flair,
    });
    props.onOpenChange(false);
  };

  return (
    <Dialog open={props.open} onOpenChange={(_, data) => props.onOpenChange(data.open)}>
      <DialogSurface className={headless.dialogSurface} data-testid="post-composer">
        <DialogHeader className={styles.overlayHeader}>
          <DialogTitle>Create a discussion</DialogTitle>
          <Button
            appearance="subtle"
            aria-label="Close post composer"
            icon={<DismissRegular />}
            onClick={() => props.onOpenChange(false)}
          />
        </DialogHeader>
        <DialogBody>
          <div className={styles.form}>
            <div>
              <p className={styles.subheading}>Share something useful, specific, and kind with the community.</p>
              <ProgressBar aria-label={`${completedFields} of 4 fields complete`} max={4} value={completedFields} />
            </div>

            <Field
              label="Title"
              required
              validationMessage={titleInvalid ? 'Use at least 8 characters for a clear title.' : undefined}
              validationState={titleInvalid ? 'error' : 'none'}
            >
              <Input
                aria-invalid={titleInvalid}
                className={headless.input}
                data-testid="composer-title"
                input={{ className: headless.inputElement }}
                value={values.title}
                onChange={(_, data) => setValues(current => ({ ...current, title: data.value }))}
              />
            </Field>

            <div className={styles.formGrid}>
              <Field
                label="Community"
                required
                validationMessage={communityInvalid ? 'Choose a community.' : undefined}
                validationState={communityInvalid ? 'error' : 'none'}
              >
                <Dropdown
                  aria-invalid={communityInvalid}
                  button={{ className: headless.dropdownButton }}
                  className={headless.dropdown}
                  clearButton={null}
                  data-testid="composer-community"
                  expandIcon={<ChevronDownRegular />}
                  listbox={{ className: headless.dropdownListbox }}
                  placeholder="Select a community"
                  selectedOptions={values.communityId ? [values.communityId] : []}
                  value={communities.find(community => community.id === values.communityId)?.name ?? ''}
                  onOptionSelect={(_, data) =>
                    setValues(current => ({ ...current, communityId: String(data.optionValue ?? '') }))
                  }
                >
                  {communities.map(community => (
                    <Option className={headless.dropdownOption} key={community.id} value={community.id}>
                      {community.name}
                    </Option>
                  ))}
                </Dropdown>
              </Field>

              <Field
                label="Flair"
                required
                validationMessage={flairInvalid ? 'Choose a flair.' : undefined}
                validationState={flairInvalid ? 'error' : 'none'}
              >
                <Dropdown
                  aria-invalid={flairInvalid}
                  button={{ className: headless.dropdownButton }}
                  className={headless.dropdown}
                  clearButton={null}
                  data-testid="composer-flair"
                  expandIcon={<ChevronDownRegular />}
                  listbox={{ className: headless.dropdownListbox }}
                  placeholder="Select a flair"
                  selectedOptions={values.flair ? [values.flair] : []}
                  value={values.flair}
                  onOptionSelect={(_, data) =>
                    setValues(current => ({ ...current, flair: String(data.optionValue ?? '') }))
                  }
                >
                  {flairOptions.map(flair => (
                    <Option className={headless.dropdownOption} key={flair} value={flair}>
                      {flair}
                    </Option>
                  ))}
                </Dropdown>
              </Field>
            </div>

            <Field
              label="Discussion"
              required
              validationMessage={bodyInvalid ? 'Add at least 20 characters of context.' : undefined}
              validationState={bodyInvalid ? 'error' : 'none'}
            >
              <Textarea
                aria-invalid={bodyInvalid}
                className={headless.textarea}
                data-testid="composer-body"
                resize="vertical"
                textarea={{ className: headless.textareaElement }}
                value={values.body}
                onChange={(_, data) => setValues(current => ({ ...current, body: data.value }))}
              />
            </Field>
          </div>
        </DialogBody>
        <DialogActions className={styles.formActions}>
          <Button appearance="secondary" onClick={() => props.onOpenChange(false)}>
            Cancel
          </Button>
          <Button appearance="primary" data-testid="composer-submit" icon={<SendRegular />} onClick={submit}>
            Publish discussion
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
}
