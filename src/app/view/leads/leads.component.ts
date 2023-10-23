import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/shared/services/generic.service';
import { Lead } from 'src/core/Models/Leads';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  ELEMENT_DATA: Lead[] = [];
  dataSource:any;
  displayedColumns: string[] = ['name', 'phone', 'source', 'duplicate_of','actions'];
 
  constructor(private genericServ:GenericService){}
  ngOnInit(): void {
    this.getAllLeads();
  }

  getAllLeads(){
    this.genericServ.getAll('leads').subscribe({
      next:(res)=>{
        this.dataSource = res
      },
      error:(err)=>{},
      complete:()=>{}
    })
  }
}
