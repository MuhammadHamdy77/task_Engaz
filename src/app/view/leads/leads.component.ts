import { Component, OnInit } from '@angular/core';
import { Lead } from 'src/app/core/Models/Leads';
import { LeadsService } from '../services/leads.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  leads: Lead[] = [];
  selectedLead: Lead | null = null;
  potentialDuplicates: Lead[] = [];
  selectedDuplicates: Lead[] = [];
  ELEMENT_DATA: Lead[] = [];
  dataSource:any;
  displayedColumns: string[] = ['name', 'phone', 'source','actions'];
  constructor(private leadsService: LeadsService) {}

  ngOnInit(): void {
    this.fetchAllLeads();
  }
  // Get All Leads
  fetchAllLeads(): void {
    this.leadsService.getAllLeads().subscribe({
      next:(leads) => {
        this.leads = leads;
        this.selectedLead = null;
        this.potentialDuplicates = [];
      },
      error:(error) => {
        console.error('Failed to fetch leads:', error);
      },
      complete:()=>{}
    }
    );
  }
  // Get Potential Duplicates
  fetchPotentialDuplicates(lead: Lead): void {
    this.leadsService.getPotentialDuplicates(lead.lead_id).subscribe({
      next:(duplicateIds) => {
        this.potentialDuplicates = this.leads.filter((lead) =>
          duplicateIds.includes(lead.lead_id)
        );
      },
      error:(error) => {
        console.error('Failed to fetch potential duplicates:', error);
      },
      complete:()=>{}
    } );
  }
  // Push in Array selected Duplicates
  updateSelectedDuplicates(event: any, duplicate: Lead): void {
    if (event.checked) {
      this.selectedDuplicates.push(duplicate);
    } else {
      const index = this.selectedDuplicates.findIndex((d) => d.lead_id === duplicate.lead_id);
      if (index !== -1) {
        this.selectedDuplicates.splice(index, 1);
      }
    }
  }
  // Mark Function
  markDuplicates(lead: Lead): void {
    const duplicateIds = this.selectedDuplicates.map((duplicate) => duplicate.lead_id);
    this.leadsService.markAsDuplicate(lead.lead_id, duplicateIds).subscribe({
      next:(res) => {
        console.log('Duplicates marked successfully.');
        this.fetchAllLeads();
      },
      error:(error) => {
        console.error('Failed to mark duplicates:', error);
      },
      complete:()=>{}
    });
  }
}
