import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

constructor() { }

  showMessage( position: any, icon: any, title: string, timer: number ): void {
    Swal.fire({ position, icon, title, showConfirmButton: false, timer });
  }

}
