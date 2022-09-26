import { useState, LegacyRef, useRef, useEffect, useCallback } from 'react';
import { extractData, getFormInputs, updateFormInputs, validateFn } from './helpers';
import { UseFormConfig, UseFormErrors, UseFormOptions, UseFormValue } from './types';

export interface UseForm<T> {
  ref: LegacyRef<HTMLFormElement>;
  submitted: boolean;
  valid: boolean;
  data: T;
  errors: UseFormErrors<T>;
  change: (e: Event) => void | Error;
  set: (data: Partial<T>, replace?: boolean) => void;
  validate: () => { valid: boolean; errors: UseFormErrors<T> };
  submit: () => { valid: boolean; errors: UseFormErrors<T> };
}

export default function useForm<T>(config: UseFormConfig<T>, options?: UseFormOptions): UseForm<T> {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<Record<keyof T, HTMLInputElement[]>>({} as Record<keyof T, HTMLInputElement[]>);

  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<T>({} as T);
  const [errors, setErrors] = useState({} as UseFormErrors<T>);

  const validate = useCallback(
    (d?: T): { valid: boolean; errors: UseFormErrors<T> } => {
      const { valid, errors } = validateFn<T>(config, d || data || ({} as T));
      setErrors(errors);
      formRef.current?.classList[valid ? 'remove' : 'add']('uf-invalid');

      Object.entries<HTMLInputElement[]>(inputRefs.current).forEach(([prop, els]) => {
        els.forEach((el) => {
          console.log('update', errors[prop as keyof T] ? 'add' : 'remove', prop);
          el.classList[errors[prop as keyof T] ? 'add' : 'remove']('uf-invalid');
        });
      });

      return { valid, errors };
    },
    [config, data],
  );

  const change = useCallback(
    (e: Event): void | Error => {
      const { type, checked, value, name, classList } = e.target as HTMLInputElement;
      const val = type === 'checkbox' ? !!checked : value;
      if (!name) {
        throw Error('Name is required for a Form Element');
      }

      classList.add('uf-changed');
      formRef.current?.classList.add('uf-changed');

      let newData: T;
      setData((prevData: T | undefined) => {
        newData = { ...(prevData || ({} as T)), [name]: val };
        const { errors: errs } = validate(newData);
        classList[errs[name as keyof T] ? 'add' : 'remove']('uf-invalid');
        return newData;
      });
    },
    [setData, validate],
  );

  const set = (d: Partial<T>, replace: boolean = false, keepSubmit = false): void => {
    setSubmitted(keepSubmit);
    setErrors({} as UseFormErrors<T>);
    const newData: T = replace ? { ...(d as T) } : { ...(data || ({} as T)), ...d };
    setData(newData);
    inputRefs.current = updateFormInputs(formRef.current, newData as Record<keyof T, UseFormValue>) as Record<
      keyof T,
      HTMLInputElement[]
    >;
  };

  const submit = useCallback((): { valid: boolean; errors: UseFormErrors<T> } => {
    setSubmitted(true);
    return validate();
  }, [validate]);

  const i = JSON.stringify(extractData(config));
  useEffect(() => {
    const d = JSON.parse(i) || {};
    setData(d);
    inputRefs.current = updateFormInputs(formRef.current, d) as Record<keyof T, HTMLInputElement[]>;

    function handleReset(e: Event) {
      e.preventDefault();
      formRef.current?.classList.remove('uf-submitted');
      formRef.current?.classList.remove('uf-touched');
      //validate(d);
      //setData(d);
      //inputRefs.current = updateFormInputs(formRef.current, d) as Record<keyof T, HTMLInputElement[]>;
    }

    const rc = formRef.current;
    if (rc) {
      rc.addEventListener('reset', handleReset);
    }
    return () => {
      if (rc) {
        rc.removeEventListener('reset', handleReset);
      }
    };
  }, [i, setData]);

  useEffect(() => {
    if (options?.validateOn === 'submit' || !formRef.current) {
      return;
    }

    const eventNames = {
      blur: 'change',
      change: 'input',
    };

    const eventName = eventNames[options?.validateOn || 'change'] || 'change';

    const rc = formRef.current;
    getFormInputs(rc).forEach((el) => el.addEventListener(eventName, change));

    return () => {
      if (rc) {
        getFormInputs(rc).forEach((el) => el.removeEventListener(eventName, change));
      }
    };
  }, [options, change]);

  useEffect(() => {
    const rc = formRef.current;

    function focus(e: FocusEvent) {
      formRef.current?.classList.add('uf-touched');
      (e?.target as any).classList.add('uf-touched');
    }

    getFormInputs(rc).forEach((el) => el.addEventListener('focus', focus));

    return () => {
      if (rc) {
        getFormInputs(rc).forEach((el) => el.removeEventListener('focus', focus));
      }
    };
  });

  useEffect(() => {
    function handleSubmit() {
      formRef.current?.classList.add('uf-submitted');
      submit();
    }

    const rc = formRef.current;
    if (rc) {
      rc.addEventListener('submit', handleSubmit);
    }
    return () => {
      if (rc) {
        rc.removeEventListener('submit', handleSubmit);
      }
    };
  }, [submit]);

  return {
    ref: formRef,
    submitted,
    valid: !Object.keys(errors).length,
    data,
    errors,
    change,
    set,
    validate,
    submit,
  };
}
