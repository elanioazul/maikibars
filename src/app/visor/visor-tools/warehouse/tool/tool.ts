import { Component, computed, effect, EventEmitter, Output, signal } from '@angular/core';
import { ITool, IToolConfig } from '../../../../core/interfaces/tool.interface';
import { toolType } from '../../../../core/enums/tool-type';

@Component({
  selector: 'app-tool',
  imports: [],
  template: '',
  styleUrl: './tool.scss',
})
export class Tool {

  public tool!: ITool;
  public icon?: string;

  bearing = signal(0);
  pitch = signal(0);

  rotationStyle = computed(() => {
    return `rotate(${this.bearing()}deg) rotateX(${this.pitch()}deg)`;
  });

  constructor() {
    // This will log every single time the bearing or pitch changes!
    // effect(() => {
    //   console.log('Current Rotation Style:', this.rotationStyle());
    // });
  }

  @Output() isLocating = new EventEmitter<boolean>();

  public get config(): IToolConfig | null {
    const defaultConfig: IToolConfig = {
        icon: '',
        tooltipMessage: '',
        type: toolType.default
      };
    return this.tool?.config ?? defaultConfig;
  }

  onClick(): void {}
}
