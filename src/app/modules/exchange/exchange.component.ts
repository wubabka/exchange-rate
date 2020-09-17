import { Component, OnInit } from '@angular/core';

import { ExchangeService } from './exchange.service';
import { catchError } from 'rxjs/operators';
import { interval, throwError } from 'rxjs';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit {
  exchange: number;
  charCode: string;

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit(): void {
    this.charCode = 'EUR';

    this.getExchange(this.charCode);
  }

  getExchange(charCode: string): void {
    this.getExchangeJSON(charCode);

    const source = interval(10000);
    source.subscribe(() => {
      this.getExchangeJSON(charCode);
    });
  }

  getExchangeJSON(charCode: string): any {
    this.exchangeService
      .getData('https://www.cbr-xml-daily.ru/daily_json.js', 'json')
      .pipe(
        catchError((err): any => {
          this.getExchangeXML(charCode);

          return throwError(err);
        })
      )
      .subscribe((res: any) => {
        this.exchange = res.Valute[charCode].Value;
      });
  }

  getExchangeXML(charCode: string): void {
    this.exchangeService
      .getData('https://www.cbr-xml-daily.ru/daily_utf8.xml', 'text')
      .subscribe((res: any) => {
        this.exchangeService.parsexml(res).ValCurs.Valute.map((val) => {
          if (val.CharCode === charCode) {
            this.exchange = Number(val.Value.replace(',', '.'));
          }
        });
      });
  }
}
