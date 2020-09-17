import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeComponent } from './exchange.component';

@NgModule({
  declarations: [ExchangeComponent],
  imports: [CommonModule],
  exports: [
    ExchangeComponent
  ]
})
export class ExchangeModule {}
