import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Block } from './block';
import { Laboratory } from './laboratory';
import { Software } from './software';

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  private url = 'http://localhost:5200';
  private blocks$: Subject<Block[]> = new Subject();
  private labs$: Subject<Laboratory[]> = new Subject();
  private softwares$: Subject<Software[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  private refreshBlocks() {
    this.httpClient.get<Block[]>(`${this.url}/blocks`).subscribe((blocks) => {
      this.blocks$.next(blocks);
    });
  }

  private refreshLabs(blockId: string) {
    this.httpClient
      .get<Laboratory[]>(`${this.url}/blocks/${blockId}/labs`)
      .subscribe((labs) => {
        this.labs$.next(labs);
      });
  }

  private refreshSoftwares(blockId: string, labId: string) {
    this.httpClient
      .get<Software[]>(`${this.url}/blocks/${blockId}/labs/${labId}/softwares`)
      .subscribe((softwares) => {
        this.softwares$.next(softwares);
      });
  }

  getBlocks(): Subject<Block[]> {
    this.refreshBlocks();
    return this.blocks$;
  }

  getBlock(id: string): Observable<Block> {
    return this.httpClient.get<Block>(`${this.url}/blocks/${id}`);
  }

  getLabs(idBlock: string): Observable<Laboratory[]> {
    this.refreshLabs(idBlock);
    return this.labs$;
  }

  createBlock(block: Block): Observable<string> {
    return this.httpClient.post(`${this.url}/blocks`, block, {
      responseType: 'text',
    });
  }

  updateBlock(id: string, block: Block): Observable<string> {
    return this.httpClient.put(`${this.url}/blocks/${id}`, block, {
      responseType: 'text',
    });
  }

  deleteBlock(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/blocks/${id}`, {
      responseType: 'text',
    });
  }

  // Softwares

  getSoftwares(idBlock: string, idLab: string): Observable<Software[]> {
    this.refreshSoftwares(idBlock, idLab);
    return this.softwares$;
  }

  addSoftware(
    blockId: string,
    labId: string,
    software: Software
  ): Observable<string> {
    return this.httpClient.put(
      `${this.url}/blocks/${blockId}/labs/${labId}/softwares/add-request`,
      JSON.stringify(software),
      {
        responseType: 'text',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
//'/:id_block/labs/:id_lab/softwares/addSoftware',
