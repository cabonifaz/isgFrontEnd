import {Component, OnInit} from '@angular/core';
import {Machine} from "../../shared/models/machine.interface";
import {ActivatedRoute} from "@angular/router";
import {MACHINES} from "../../mocks/mock-data";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-machine-events',
  templateUrl: './machine-events.component.html',
  styleUrls: ['./machine-events.component.css']
})
export class MachineEventsComponent implements OnInit {

  machineId!: number;
  machine: Machine = MACHINES.filter(machine => machine.id === 1)[0];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.machineId = +params.get('machine-id')!;
    });
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.machine.events);
      const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, "products");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
