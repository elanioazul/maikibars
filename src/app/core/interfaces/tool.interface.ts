import { Tool } from '../../visor/visor-tools/warehouse/tool/tool';
import { toolType } from '../enums/tool-type';

export interface ITool {
  id: number;
  key: string;
  name: string;
  description?: string;
  widget: () => Promise<typeof Tool>;
  config?: IToolConfig;
}

export interface IToolConfig {
  icon: string;
  tooltipMessage: string,
  type: toolType;
  active?: boolean;
}
