import * as React from 'react';
import { useFluent } from '@fluentui/react-components';
import { usePositioning } from '@fluentui/react-positioning';
import { useId, useMergedRefs, useOnClickOutside } from '@fluentui/react-utilities';

import { useCaretPosition } from './utils/selection';
import { ActiveDescendantImperativeRef } from './utils/types';
import { useActiveDescendant } from './utils/useActiveDescendant';

import { people } from './data';

const options = people.map(person => ({
  id: person.split(' ')[0],
  text: person,
}));

export const ContentEditableTagsRenderer = () => {
  const { targetDocument } = useFluent();
  const { getCaretPosition } = useCaretPosition();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | null>('');
  const [selected, setSelected] = React.useState<string | null>(null);
  const listboxId = useId('listbox');

  const { containerRef } = usePositioning({
    align: 'start',
    position: 'below',
    matchTargetSize: 'width',
  });
  const listboxHtmlRef = React.useRef<HTMLDivElement>(null);
  const activeDescendantImperativeRef = React.useRef<ActiveDescendantImperativeRef>(null);

  const { activeParentRef, listboxRef: listboxActiveDescendantRef } = useActiveDescendant({
    matchOption: el => el.getAttribute('role') === 'option',
    imperativeRef: activeDescendantImperativeRef,
  });

  const listboxRef = useMergedRefs(listboxHtmlRef, containerRef, listboxActiveDescendantRef);
  const inputRef = useMergedRefs(activeParentRef);

  useOnClickOutside({
    callback: () => {
      setOpen(false);
    },
    refs: [inputRef, listboxHtmlRef],
    element: targetDocument,
  });

  React.useEffect(() => {
    if (!activeDescendantImperativeRef.current?.active()) {
      activeDescendantImperativeRef.current?.first();
    }
  }, [value]);

  const selectActive = React.useCallback(() => {
    const activeId = activeDescendantImperativeRef.current?.active();
    if (activeId) {
      const next = options.find(x => x.id === activeId);
      if (next) {
        const position = inputRef.current ? getCaretPosition(inputRef.current) : 0;
        const newValue = value ? [value.slice(0, position), next.text, value.slice(position)].join('') : next.text;
        setValue(newValue);
        setSelected(next.id);
      } else {
        // const selectedText = options.find(x => x.id === selected)?.text;
        // setValue(selectedText ?? '');
      }
    }
  }, [selected, getCaretPosition, inputRef, value]);

  const onInputChange = React.useCallback(
    (newValue: string | null) => {
      setValue(newValue);
    },
    [setValue],
  );

  const onInputKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      let preventDefault: boolean | undefined | void = false;
      switch (event.key) {
        case 'Enter':
          selectActive();
          setOpen(false);
          preventDefault = true;
          break;
        case 'Escape':
          setOpen(false);
          preventDefault = true;
          break;
        case 'ArrowDown':
          setOpen(true);
          if (activeDescendantImperativeRef.current?.active()) {
            activeDescendantImperativeRef.current?.next();
          } else {
            activeDescendantImperativeRef.current?.first();
          }
          preventDefault = true;
          break;
        case 'ArrowUp':
          setOpen(true);
          activeDescendantImperativeRef.current?.prev();
          preventDefault = true;
          break;
        case 'Tab':
          selectActive();
          setOpen(false);
          break;
        default:
        // setOpen(true);
      }

      if (preventDefault) {
        event.preventDefault();
      }
    },
    [selectActive, setOpen],
  );

  React.useEffect(() => {
    if (open) {
      activeDescendantImperativeRef.current?.first();
    }
  }, [open]);

  React.useEffect(() => {
    if (value === '') {
      setSelected(null);
      activeDescendantImperativeRef.current?.blur();
    }
  }, [value]);

  return (
    <>
      <Contenteditable
        inputRef={inputRef as React.Ref<HTMLDivElement>}
        value={value}
        onContentChange={onInputChange}
        onKeyDown={onInputKeyDown}
        data-selected={selected}
        aria-label="Choose person"
        aria-controls={open ? listboxId : undefined}
        aria-expanded={open}
      />
      {open && (
        <div role="listbox" id={listboxId} ref={listboxRef}>
          {options.map(option => (
            <div key={option.id} id={option.id} role="option" aria-selected={selected === option.id ? true : undefined}>
              {option.text}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

interface ContenteditableProps extends React.HTMLAttributes<HTMLDivElement> {
  inputRef: React.Ref<HTMLDivElement>;
  value: string | null;
  onContentChange: (newValue: string | null) => void;
}
const Contenteditable: React.FC<ContenteditableProps> = ({ inputRef, value, onContentChange, ...props }) => {
  const contentEditableRef = React.useRef<HTMLDivElement>(null);
  const ref = useMergedRefs(inputRef, contentEditableRef);

  React.useEffect(() => {
    if (contentEditableRef.current && contentEditableRef.current.textContent !== value) {
      contentEditableRef.current.textContent = value;
    }
  });

  return (
    <div
      contentEditable="true"
      ref={ref}
      onInput={event => {
        const newValue = (event.target as HTMLDivElement).textContent;
        onContentChange(newValue);
      }}
      {...props}
    />
  );
};
