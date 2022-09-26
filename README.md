<div align="center">
<h1>useForm</h1>

<a href="https://www.emojione.com/emoji/1f410">
  <img
    height="80"
    width="80"
    alt="goat"
    src="https://raw.githubusercontent.com/testing-library/react-testing-library/main/other/goat.png"
  />
</a>

<p>Do simple things in a simplest way.</p>

<br /><br /><br />

</div>

<h1>Getting Started</h1>
<br />

To get it started, add `use-form` to your project:

```sh
yarn add @kkatkus/use-form
```

Or if you prefer using npm:

```sh
npm install @kkatkus/use-form --save
```

<br />
<h1>Examples</h1>

```ts
useForm<T>(config: UseFormConfig<T>, initialData: T, options?: UseFormOptions): UseForm<T>
```

 Example:
 ```ts
interface ExampleForm extends Record<string, UseFormValue> {
  email: string;
  password: string;
  repeatPassword: string;
  age: number;
};
```

```jsx
function Example(): ReactElement {
  
  const ageValidator = (val: UseFormValue): string | undefined => {
    if (val === "") {
      return;
    }

    if (Number(val) < 18) {
      return " Not 18";
    }
  };

  const form = useForm<ExampleForm>(
    {
      email: [required('Email is required'), email()],
      password: [required('Password is required'), minLength(8)],
      repeatPassword: [required('Repeat password is required'), equal<ExampleForm>('password', 'Passwords must match')],
      age: [required('Age is required'), ageValidator],
    },
    {
      email: 'test@test.com',
    },
    {
      validateOn: 'change',
    }
  );

  const handleSubmit = async (e: MouseEvent | FormEvent) => {
    e.preventDefault();
    const { isValid } = form.submit();
    if (!isValid) {
      return;
    }

    // when valid do something
    // ...
  };

  return (
    <form ref={ref.current} onSubmit={handleSubmit} method="post">
      <Input type="text" placeholder="Email address" name="email" />
      <Input type="password" placeholder="Password" name="password" />
      <Input type="password" placeholder="Repeat password" name="repeatPassword" />
      <Input type="number" placeholder="Age" name="age" />
      <button type="submit">Create my account</button>
    </form>
  );
```

<h2>Validators</h2>

| Validator  | Center Aligned  |
| :------------ |:---------------|
| ```min(minVal: number, message: string): string \| undefined``` | Validator that requires the control's value to be greater than or equal to the provided number.     |
| ```max(maxVal: number, message: string): string \| undefined```                | Validator that requires the control's value to be less than or equal to the provided number.        |
| ```required(message: string): string \| undefined```                           | Validator that requires the control have a non-empty value.        |
| ```requiredTrue(message: string): string \| undefined```                       | Validator that requires the control's value be true. This validator is commonly used for required checkboxes.        |
| ```equal(withName: string, message: string): string \| undefined```            | Validator that requires the control's value to be equal with other control's value. This validator is commonly used to compare passwords        |
| ```email(message: string): string \| undefined```                              | Validator that requires the control's value pass an email validation test.        |
| ```minLength(minLengh: number, message: string): string \| undefined```        | Validator that requires the length of the control's value to be greater than or equal to the provided minimum length.        |
| ```maxLength(maxLength: number, message: string): string \| undefined```       | Validator that requires the length of the control's value to be less than or equal to the provided maximum length.        |
| ```pattern(pattern: string \| RegExp, message: string): string \| undefined```  | Validator that requires the control's value to match a regex pattern.        |