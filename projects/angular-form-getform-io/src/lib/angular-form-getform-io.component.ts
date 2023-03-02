import { Component, HostListener, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TooltipPosition } from './components/tooltip/tooltip.enums';
import { getErrorMessages } from './helpers';
import { TField } from './types';

@Component({
  selector: 'lib-angular-form-getform-io',
  templateUrl: './angular-form-getform-io.component.html',
  styleUrls: ['./angular-form-getform-io.component.scss'],
})
export class AngularFormGetformIoComponent {
  @Input() targetUrl: string = '';
  @Input() fields: TField[] = [
    {
      type: 'text',
      name: 'name',
      label: 'Your name',
      validations: [
        {
          type: 'required',
          value: true,
          errorMessage: 'Required field',
        },
      ],
    },
  ];
  @Input() formClassName?: string = '';
  @Input() btnClassName?: string = '';
  @Input() btnLabel?: string = '';
  @Input() successCallback?: () => void;

  isFormSubmitted = false;
  isLoading = false;

  form: any = new FormGroup({});

  errorMessages: { [key: string]: any } = {};

  ngOnInit() {
    this.fields.forEach((field) => {
      if (field.validations)
        this.errorMessages[field.name] = {
          ...getErrorMessages(field.validations),
        };
      this.form.addControl(
        field.name,
        new FormControl(
          null,
          !field.validations
            ? []
            : field.validations.reduce((acc: any, current) => {
                switch (current.type) {
                  case 'required':
                    return [...acc, Validators.required];

                  case 'minLength':
                    return [
                      ...acc,
                      Validators.minLength(Number(current.value)) || 2,
                    ];

                  case 'maxLength':
                    return [
                      ...acc,
                      Validators.maxLength(Number(current.value) || 10),
                    ];

                  case 'max':
                    return [
                      ...acc,
                      Validators.max(Number(current.value) || 100),
                    ];

                  case 'min':
                    return [...acc, Validators.min(Number(current.value) || 0)];

                  case 'email':
                    return [...acc, Validators.email];

                  case 'pattern':
                    return [
                      ...acc,
                      Validators.pattern(
                        String(current.value) || '[a-zA-Z" "]+'
                      ),
                    ];

                  default:
                    return acc;
                }
              }, [])
        )
      );
    });
  }

  constructor() {}

  onSubmit() {
    this.isFormSubmitted = true;

    if (this.form.invalid) return;

    const formData = new FormData();

    for (let value in this.form.value) {
      formData.append(value, this.form.value[value]);
    }

    this.isLoading = true;
    fetch(this.targetUrl as string, {
      method: 'post',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then(() => {
        this.form.reset();
        Object.keys(this.form.controls).forEach((key) => {
          this.form.get(key)?.setErrors(null);
        });
        if (typeof this.successCallback === 'function') this.successCallback();
      })
      .catch((err) => console.log({ err }))
      .finally(() => {
        this.isLoading = false;
      });
  }
  TooltipPosition: typeof TooltipPosition = TooltipPosition;
  x = 0;
  y = 0;
  coordinates = '';

  @HostListener('mousemove', ['$event'])
  onMouseMove($event: MouseEvent): void {
    this.x = $event.clientX;
    this.y = $event.clientY;
    this.coordinates = `${this.x},${this.y}`;
  }
}
