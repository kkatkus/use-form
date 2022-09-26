import React, { FormEvent } from 'react';
import { UseFormValue } from '../useForm/types';
import useForm from '../useForm/useForm';
import './styles.css';

interface Props {
  /**
   * How should validation trigger
   */
  validateOn?: 'change' | 'blur' | 'submit';
}

interface Form {
  customNumberField: number;
}

/**
 * Write custom validators
 */
export const CustomValidator = ({ validateOn = 'change' }: Props) => {
  const customValidator = (val: UseFormValue): string | null => {
    console.log(val, 'asdasdasd');

    if (val === '') {
      return null;
    }

    if (Number(val) < 5) {
      return ' Number should be more than 5';
    }

    if (Number(val) > 10) {
      return ' Number should be less than 10';
    }

    return null;
  };
  const { ref, errors, data, valid, validate } = useForm<Form>(
    {
      customNumberField: ['', [customValidator]],
    },
    { validateOn },
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // can do manual validation
    // const { valid, errors } = validate();
  }

  return (
    <>
      {Object.values(errors).map((err) => (
        <p className="uf-errors" key={err}>
          {err}
        </p>
      ))}
      <form ref={ref} onSubmit={handleSubmit} method="post">
        <input name="customNumberField" type="number" />
        <br />
        <button disabled={!valid} type="submit">
          submit
        </button>
      </form>

      <p>Form data:</p>
      <code>{JSON.stringify(data)}</code>

      <p>Errors:</p>
      <code>{JSON.stringify(errors)}</code>
    </>
  );
};
