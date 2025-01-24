import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CasesEventService {
  private refreshCasesSubject = new Subject<void>();
  refreshCases$ = this.refreshCasesSubject.asObservable();

  emitRefreshCases() {
    this.refreshCasesSubject.next();
  }
}
