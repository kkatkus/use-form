import { useState, useRef, useEffect, useCallback } from 'react';
import { extractData, getFormInputs, updateValuesForFormInputs, validateFn } from './helpers';
import { UseForm, UseFormConfig, UseFormErrors, UseFormOptions, UseFormValue } from './types';

export function useForm<T>(config: UseFormConfig<T>, options?: UseFormOptions): UseForm<T> {
  const ref = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<Record<keyof T, HTMLInputElement[]>>({} as Record<keyof T, HTMLInputElement[]>);

  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<T>({} as T);
  const [errors, setErrors] = useState({} as UseFormErrors<T>);

  const validate = useCallback(
    (d?: T): { valid: boolean; errors: UseFormErrors<T> } => {
      const { valid, errors } = validateFn<T>(config, d || data || ({} as T));
      setErrors(errors);
      ref.current?.classList[valid ? 'remove' : 'add']('uf-invalid');
      Object.entries<HTMLInputElement[]>(inputRefs.current).forEach(([prop, els]) => {
        els.forEach((el) => {
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

      const instantUpdate = options?.validateOn !== 'submit';

      if (!classList.contains('uf-touched')) {
        classList.add('uf-touched');
      }

      if (instantUpdate) {
        classList.add('uf-changed');
        ref.current?.classList.add('uf-changed');
      }

      let newData: T;
      setData((prevData: T | undefined) => {
        newData = { ...(prevData || ({} as T)), [name]: val };
        if (instantUpdate) {
          const { errors: errs } = validate(newData);
          classList[errs[name as keyof T] ? 'add' : 'remove']('uf-invalid');
        }
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
    inputRefs.current = updateValuesForFormInputs(ref.current, newData as Record<keyof T, UseFormValue>) as Record<
      keyof T,
      HTMLInputElement[]
    >;
  };

  const submit = useCallback((): { valid: boolean; errors: UseFormErrors<T> } => {
    setSubmitted(true);
    return validate();
  }, [validate, setSubmitted]);

  // SET DATA, RESET DATA
  const i = JSON.stringify(extractData(config));
  useEffect(() => {
    const d = JSON.parse(i) || {};
    setData(d);
    inputRefs.current = updateValuesForFormInputs(ref.current, d) as Record<keyof T, HTMLInputElement[]>;

    function handleReset(e: Event) {
      e.preventDefault();
      ref.current?.classList.remove('uf-submitted');
      ref.current?.classList.remove('uf-invalid');
      ref.current?.classList.remove('uf-touched');
      ref.current?.classList.remove('uf-changed');
      setSubmitted(false);
      setData(d);
      setErrors({} as UseFormErrors<T>);
      inputRefs.current = updateValuesForFormInputs(ref.current, d) as Record<keyof T, HTMLInputElement[]>;
      Object.values<HTMLInputElement[]>(inputRefs.current).forEach((els) => {
        els.forEach((el) => {
          el.classList.remove('uf-invalid');
          el.classList.remove('uf-touched');
          el.classList.remove('uf-changed');
        });
      });
    }

    const rc = ref.current;
    if (rc) {
      rc.addEventListener('reset', handleReset);
    }
    return () => {
      if (rc) {
        rc.removeEventListener('reset', handleReset);
      }
    };
  }, [i, setData, setErrors, setSubmitted]);

  // ELEMENT CHANGE
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const eventName = options?.validateOn === 'change' ? 'input' : 'change';

    const rc = ref.current;
    getFormInputs(rc).forEach((el) => el.addEventListener(eventName, change));

    return () => {
      if (rc) {
        getFormInputs(rc).forEach((el) => el.removeEventListener(eventName, change));
      }
    };
  }, [options, change]);

  // ELEMENT FOCUS
  useEffect(() => {
    const rc = ref.current;

    function focus(e: FocusEvent) {
      ref.current?.classList.add('uf-touched');
      (e?.target as any).classList.add('uf-touched');
    }

    getFormInputs(rc).forEach((el) => el.addEventListener('focus', focus));

    return () => {
      if (rc) {
        getFormInputs(rc).forEach((el) => el.removeEventListener('focus', focus));
      }
    };
  });

  //SUBMIT
  useEffect(() => {
    function handleSubmit() {
      ref.current?.classList.add('uf-submitted');
      submit();
    }

    const rc = ref.current;
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
    ref,
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
