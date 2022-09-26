import React, { FormEvent } from 'react';
import useForm from '../useForm/useForm';
import {
  decimal,
  email,
  equal,
  max,
  maxLength,
  min,
  minLength,
  numeric,
  pattern,
  required,
  requiredTrue,
} from '../validators';
import './styles.css';

interface Props {
  /**
   * How should validation trigger
   */
  validateOn?: 'change' | 'blur' | 'submit';
}

interface Form {
  min: number;
  max: number;
  required: string;
  requiredTrue: boolean;
  equal: string;
  email: string;
  minLength: string;
  maxLength: string;
  pattern: string;
  numeric: number;
  decimal: number;
}

/**
 * Use built-in validators
 */
export const BuiltInValidators = ({ validateOn = 'change' }: Props) => {
  const { ref, errors, data, valid } = useForm<Form>(
    {
      min: ['', [min(5)]],
      max: ['', [max(10)]],
      required: ['', [required()]],
      requiredTrue: ['', [requiredTrue()]],
      equal: ['', [equal('required')]],
      email: ['', [email()]],
      minLength: ['', [minLength(2)]],
      maxLength: ['', [maxLength(8)]],
      pattern: ['', [pattern(/^(0|[1-9][0-9]*)/)]],
      numeric: ['', [numeric()]],
      decimal: ['', [decimal()]],
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
        <input name="min" placeholder="min field" />
        <br />
        <input name="max" placeholder="max field" />
        <br />
        <input name="required" placeholder="required field" />
        <br />
        <label>
          <input name="requiredTrue" type="checkbox" />
          required true
        </label>
        <br />
        <input name="equal" placeholder="equal field with required" />
        <br />
        <input name="email" placeholder="email field" />
        <br />
        <input name="minLength" placeholder="min length field" />
        <br />
        <input name="maxLength" placeholder="max length field" />
        <br />
        <input name="pattern" placeholder="pattern field" />
        <br />
        <input name="numeric" placeholder="numeric field" />
        <br />
        <input name="decimal" placeholder="decimal field" />
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
