import { Component, ComponentRef, computed, EventEmitter, Input, OnDestroy, OnInit, Output, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { ITool } from '../../../../core/interfaces/tool.interface';
import { Tool } from '../tool/tool';
import { toolsDic } from '../../../../core/consts/tools-dictionary';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { map, Observable, pipe } from 'rxjs';
@Component({
  selector: 'app-tool-button',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './tool-button.html',
  styleUrl: './tool-button.scss',
})
export class ToolButton implements OnInit, OnDestroy {

  @Input() tool!: ITool;
  @Output() infoToBubble = new EventEmitter<boolean>();
  isSpinning$!: Observable<boolean>;
  @ViewChild('container', {
    static: true,
    read: ViewContainerRef,
  })
  private readonly container!: ViewContainerRef;
  newComponent!: ComponentRef<Tool>;

  constructor() {}

  ngOnInit(): void {
    this.loadComponent()

  }

  public onClick() {
    this.newComponent.instance.onClick();
  }

  async loadComponent() {
    if (toolsDic[this.tool.key]) {
      this.container.clear();

      const componentInstance = await this.tool.widget();
      if (componentInstance) {
        this.newComponent = this.container.createComponent(componentInstance);
        this.newComponent.instance.tool = this.tool;
        // this.newComponent.instance.isLocating.subscribe(info => {
        //   //this.infoToBubble.emit(info);
        //   console.log(info);

        // });
        this.isSpinning$ = this.newComponent.instance.isLocating.pipe(
          map(info => !!info)
        )
      }
    }
  }

  ngOnDestroy(): void {

  }

}
