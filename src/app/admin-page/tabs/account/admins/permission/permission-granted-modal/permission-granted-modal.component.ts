import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-permission-granted-modal',
  templateUrl: './permission-granted-modal.component.html',
  styleUrls: ['./permission-granted-modal.component.scss']
})
export class PermissionGrantedModalComponent implements OnInit {
  @Input() newAdmin: string;

  constructor(private ref: NbDialogRef<PermissionGrantedModalComponent>) { }

  ngOnInit(): void {
  }
  dismiss() {
    this.ref.close();
  }
}
