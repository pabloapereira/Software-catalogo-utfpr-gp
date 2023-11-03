import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Laboratory } from '../../laboratory';
import { BlockService } from '../../block.service';

@Component({
  selector: 'app-laboratories',
  templateUrl: './laboratories.component.html',
  styleUrls: ['./laboratories.component.css'],
})
export class LaboratoriesComponent implements OnInit {
  labs$: Observable<Laboratory[]> = new Observable();
  blockId: string = '';

  constructor(
    private blockService: BlockService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.blockId = params['blockId'];
      this.fetchLabs(this.blockId);
    });
  }

  private fetchLabs(blockId: string): void {
    this.labs$ = this.blockService.getLabs(blockId);
  }

  navigateToSoftwares(labId: number): void {
    this.router.navigate(['blocos', this.blockId, 'labs', labId, 'softwares']);
  }
}
