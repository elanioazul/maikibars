import { Component, EventEmitter, Output } from '@angular/core';
import { ITool, IToolConfig } from '../../../../core/interfaces/tool.interface';
import { toolType } from '../../../../core/enums/tool-type';

@Component({
  selector: 'app-tool',
  imports: [],
  templateUrl: './tool.html',
  styleUrl: './tool.scss',
})
export class Tool {

  public tool!: ITool;
  public icon?: string;

  @Output() messageEvent = new EventEmitter<boolean>();

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
