import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlockService } from 'src/app/block.service';
import { Software } from 'src/app/software';

@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.css'],
})
export class SoftwareListComponent {
  requisitions$: Observable<Software[]> = new Observable();
  blockId: string = '';
  labId: string = '';
  labName: string = '';

  constructor(
    private blockService: BlockService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.blockId = params['blockId'];
      this.labId = params['labId'];

      this.fetchSoftwares(this.blockId, this.labId);
    });
  }

  private fetchSoftwares(blockId: string, labId: string): void {
    this.requisitions$ = this.blockService.getSoftwares(blockId, labId);
  }

  navigateToForm(): void {
    this.router.navigate([
      'blocos',
      this.blockId,
      'labs',
      this.labId,
      'softwares',
      'form',
    ]);
  }
}
