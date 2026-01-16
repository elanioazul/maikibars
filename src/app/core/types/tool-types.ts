import { Tool } from "../../visor/visor-tools/warehouse/tool/tool";



interface IWidget {
	toolComponent: typeof Tool;
}

export type ToolsDictionary = Record<string, IWidget>;
