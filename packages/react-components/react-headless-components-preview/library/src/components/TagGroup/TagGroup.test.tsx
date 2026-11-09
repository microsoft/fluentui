import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagGroup } from './TagGroup';
import { Tag } from '../Tag';
import { InteractionTag, InteractionTagPrimary, InteractionTagSecondary } from '../InteractionTag';

describe('TagGroup', () => {
  isConformant({
    Component: TagGroup,
    displayName: 'TagGroup',
  });

  it('should invoke onDismiss when a child dismissible Tag is clicked', () => {
    const onDismiss = jest.fn();
    const { getByRole } = render(
      <TagGroup onDismiss={onDismiss}>
        <Tag value="1" dismissible>
          tag
        </Tag>
      </TagGroup>,
    );

    fireEvent.click(getByRole('button'));

    expect(onDismiss).toHaveBeenCalledWith(expect.anything(), { value: '1' });
  });

  it('sets data-disabled when disabled', () => {
    const { getByRole } = render(
      <TagGroup disabled>
        <Tag value="1">tag</Tag>
      </TagGroup>,
    );
    expect(getByRole('toolbar')).toHaveAttribute('data-disabled');
  });

  it('sets the focusgroup attribute on root for arrow-key navigation', () => {
    const { getByRole } = render(
      <TagGroup>
        <Tag value="1">tag</Tag>
      </TagGroup>,
    );
    expect(getByRole('toolbar')).toHaveAttribute('focusgroup', 'toolbar inline wrap');
  });

  it('does NOT spread Tabster arrow-navigation attributes onto root (headless)', () => {
    const { getByRole } = render(
      <TagGroup>
        <Tag value="1">tag</Tag>
      </TagGroup>,
    );
    expect(getByRole('toolbar').getAttribute('data-tabster')).toBeNull();
  });
});

describe('TagGroup dismissal focus', () => {
  const DismissibleTagGroup = ({
    initial = ['Cat', 'Dog', 'Ferret'],
    disabledValues = [],
    onDismiss,
    wrap = false,
  }: {
    initial?: string[];
    disabledValues?: string[];
    onDismiss?: (event: React.SyntheticEvent) => void;
    wrap?: boolean;
  }) => {
    const [values, setValues] = React.useState(initial);
    const tags = values.map(value => (
      <Tag data-testid={`tag-${value}`} disabled={disabledValues.includes(value)} key={value} value={value}>
        {value}
      </Tag>
    ));
    return (
      <>
        <TagGroup
          aria-label="Animals"
          dismissible
          onDismiss={(event, data) => {
            onDismiss?.(event);
            setValues(current => current.filter(value => value !== data.value));
          }}
        >
          {wrap ? <div>{tags}</div> : tags}
        </TagGroup>
        <button>After</button>
      </>
    );
  };

  const dismiss = (tag: HTMLElement) => {
    act(() => tag.focus());
    fireEvent.keyDown(tag, { key: 'Delete' });
  };

  it('moves focus to the next tag', () => {
    const { getByTestId, queryByTestId } = render(<DismissibleTagGroup />);

    dismiss(getByTestId('tag-Cat'));

    expect(queryByTestId('tag-Cat')).not.toBeInTheDocument();
    expect(getByTestId('tag-Dog')).toHaveFocus();
  });

  it('moves focus to the previous tag when the last tag is dismissed', () => {
    const { getByTestId } = render(<DismissibleTagGroup />);

    dismiss(getByTestId('tag-Ferret'));

    expect(getByTestId('tag-Dog')).toHaveFocus();
  });

  it('finds tags inside a layout wrapper', () => {
    const { getByTestId } = render(<DismissibleTagGroup wrap />);

    dismiss(getByTestId('tag-Cat'));

    expect(getByTestId('tag-Dog')).toHaveFocus();
  });

  it('skips tags that cannot take focus', () => {
    const { getByTestId } = render(<DismissibleTagGroup disabledValues={['Dog']} />);

    dismiss(getByTestId('tag-Cat'));

    expect(getByTestId('tag-Ferret')).toHaveFocus();
  });

  it('leaves focus alone when another tag has it', () => {
    const { getByTestId, queryByTestId } = render(<DismissibleTagGroup />);

    act(() => getByTestId('tag-Cat').focus());
    fireEvent.click(getByTestId('tag-Dog'));

    expect(queryByTestId('tag-Dog')).not.toBeInTheDocument();
    expect(getByTestId('tag-Cat')).toHaveFocus();
  });

  it('removes the tag but does not move focus when the consumer prevents default', () => {
    const { getByTestId, queryByTestId } = render(<DismissibleTagGroup onDismiss={event => event.preventDefault()} />);

    dismiss(getByTestId('tag-Cat'));

    expect(queryByTestId('tag-Cat')).not.toBeInTheDocument();
    expect(getByTestId('tag-Dog')).not.toHaveFocus();
  });

  it('moves focus past the dismissed InteractionTag to the previous tag', () => {
    const InteractionTags = () => {
      const [values, setValues] = React.useState(['Cat', 'Dog']);
      return (
        <TagGroup aria-label="Animals" onDismiss={(_, data) => setValues(v => v.filter(value => value !== data.value))}>
          {values.map(value => (
            <InteractionTag key={value} value={value}>
              <InteractionTagPrimary data-testid={`primary-${value}`}>{value}</InteractionTagPrimary>
              <InteractionTagSecondary aria-label="Remove" data-testid={`secondary-${value}`} />
            </InteractionTag>
          ))}
        </TagGroup>
      );
    };
    const { getByTestId, queryByTestId } = render(<InteractionTags />);

    dismiss(getByTestId('secondary-Dog'));

    expect(queryByTestId('primary-Dog')).not.toBeInTheDocument();
    expect(getByTestId('secondary-Cat')).toHaveFocus();
  });
});
