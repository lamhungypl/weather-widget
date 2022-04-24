import { useControllableValue } from 'ahooks';
import clsx from 'clsx';
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

import Close from '../icons/Close';

import styles from './Input.module.scss';

type NativeInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputRef = {
  clear: () => void;
  focus: () => void;
  blur: () => void;
  nativeElement: HTMLInputElement | null;
};

export interface InputProps extends Omit<NativeInputProps, 'onChange'> {
  onChange?: (val: string) => void;
  clearable?: boolean;
  onClear?: () => void;
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  wrapperClass?: string;
}

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const [value = '', setValue] = useControllableValue(props, {
    defaultValue: '',
  });

  const {
    onEnterPress,
    onChange,
    clearable,
    onClear,
    onKeyDown,
    wrapperClass,
    ...rest
  } = props;
  const [hasFocus, setHasFocus] = useState(false);
  const nativeInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    clear: () => {
      setValue('');
    },
    focus: () => {
      nativeInputRef.current?.focus();
    },
    blur: () => {
      nativeInputRef.current?.blur();
    },
    get nativeElement() {
      return nativeInputRef.current;
    },
  }));

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onEnterPress && (e.code === 'Enter' || e.keyCode === 13)) {
      onEnterPress(e);
    }
    onKeyDown?.(e);
  };

  return (
    <div
      className={clsx(wrapperClass, styles.wrapper, {
        [styles.disabled]: props.disabled,
      })}
    >
      <input
        ref={nativeInputRef}
        className={styles.element}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onFocus={(e) => {
          setHasFocus(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setHasFocus(false);
          props.onBlur?.(e);
        }}
        onKeyDown={handleKeydown}
        {...rest}
      />
      {clearable && !!value && !props.readOnly && hasFocus && (
        <div
          className={styles.clear}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={() => {
            setValue('');
            onClear?.();
          }}
        >
          <Close />
        </div>
      )}
    </div>
  );
});

export default Input;
