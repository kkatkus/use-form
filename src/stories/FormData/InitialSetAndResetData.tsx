import React, { FormEvent } from 'react';
import useForm from '../useForm/useForm';
import { required } from '../validators';
import './styles.css';

interface Props {
  /**
   * How should validation trigger
   */
  validateOn?: 'change' | 'blur' | 'submit';
}

interface Form {
  firstName: string;
  lastName: string;
}

/**
 * Set initial, update and reset form data
 */
export const InitialSetAndResetData = ({ validateOn = 'change' }: Props) => {
  const { ref, errors, data, valid, validate } = useForm<Form>(
    {
      firstName: ['first', [required()]],
      lastName: ['last', [required()]],
    },
    { validateOn },
  );

  function handleReset() {
    console.log('reset');
  }

  function handleSet() {}

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
      <form ref={ref} onSubmit={handleSubmit} onReset={handleReset} method="post">
        <input name="firstName" />
        <input name="lastName" />
        <br />
        <button disabled={!valid} type="submit">
          submit
        </button>
        <button type="reset" style={{ marginLeft: '8px' }}>
          reset
        </button>
      </form>

      <p>Form data:</p>
      <code>{JSON.stringify(data)}</code>

      <p>Errors:</p>
      <code>{JSON.stringify(errors)}</code>
    </>
  );
};
