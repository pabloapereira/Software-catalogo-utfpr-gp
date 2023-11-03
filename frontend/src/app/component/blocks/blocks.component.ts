import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Block } from '../../block';
import { BlockService } from '../../block.service';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css'],
})
export class BlocksComponent implements OnInit {
  blocks$: Observable<Block[]> = new Observable();

  constructor(private blockService: BlockService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBlocks();
  }

  private fetchBlocks(): void {
    this.blocks$ = this.blockService.getBlocks();
  }

  navigateToLabs(blockId: string): void {
    this.router.navigate(['blocos', blockId, 'labs']);
  }
}
