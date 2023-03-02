# AngularFormGetformIo

### To use the form in the component

- import Form component

```sh
import { AngularFormGetformIoModule } from 'angular-form-getform-io';
```

- add imported module to imports in main component

```sh
imports: [AngularFormGetformIoModule]
```

- use component in template

```sh
<lib-angular-form-getform-io></lib-angular-form-getform-io>
```

### Form accepts parameters

- required `[targetUrl]` (the url of your form on getform)
- required `[fields]` (list of fields that must be in the form)
- optional `[btnLabel]` - label on the button (default "Send form")
- optional `[successCallback]` - function that will be called after successful submission of the form data on getform.io

### Parameters types

- `targetUrl`: `string`
- `fields`: `array`

```sh
    name: string
    type?: string (default 'text')
    label?: string
    placeholder?: string (default equal 'label')
    isMultiLine?: boolean (if true, will be rendered '<textarea></textarea>', otherwise a '<input />')
    validations?: {
        errorMessage: string
        type: string (allowed 'required' | 'email' | 'minLength' | 'maxLength' | 'min' | 'max' | 'pattern')
        value: string | number | boolean
    }[]
```

- `btnLabel`: `string`
- `successCallback`: `() => void`

### 'fields' parameter examples

```sh
 type: 'text',
 name: 'name',
 label: 'Your first name',
 validations: [
   {
        type: 'required',
        value: true,
        errorMessage: 'Required field',
    },
    {
        type: 'minLength',
        value: 2,
        errorMessage: 'At least 2 characters',
    },
    {
        type: 'pattern',
        value: '[a-zA-Z]+',
        errorMessage: 'Only letters',
    },
],
```

```sh
type: 'number',
name: 'age',
label: 'Your age',
placeholder: 'Age'
validations: [
    {
        type: 'min',
        value: 18,
        errorMessage: 'The minimum age is not reached',
    },
]
```
