import { TooltipComponent } from './components/tooltip/tooltip.component';
import { NgModule } from '@angular/core';
import { AngularFormGetformIoComponent } from './angular-form-getform-io.component';
import { CommonModule } from '@angular/common';
import { TooltipModule } from './components/tooltip/tooltip.module';
import { InputComponent } from './components/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    AngularFormGetformIoComponent,
    TooltipComponent,
    InputComponent,
    ButtonComponent,
  ],
  imports: [CommonModule, TooltipModule, ReactiveFormsModule],
  exports: [AngularFormGetformIoComponent],
})
export class AngularFormGetformIoModule {}
