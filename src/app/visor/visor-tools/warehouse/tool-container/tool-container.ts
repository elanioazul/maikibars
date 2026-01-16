import { Component, Input } from '@angular/core';
import { visorConfig } from '../../../../core/consts/visor-config';
import { ToolButton } from '../tool-button/tool-button';
import { ITool } from 'src/app/core/interfaces/tool.interface';

@Component({
  selector: 'app-tool-container',
  imports: [ToolButton],
  templateUrl: './tool-container.html',
  styleUrl: './tool-container.scss',
})
export class ToolContainer {
  @Input({ required: true }) tools!: ITool[];
  //toolsTopRight = [visorConfig.tools[0],visorConfig.tools[1], visorConfig.tools[2]];
}
