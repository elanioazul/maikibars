import {ToolsDictionary} from '../types/tool-types'

import { Geolocator } from '../../visor/visor-tools/geolocator/geolocator';
import { Pitch } from '../../visor/visor-tools/pitch/pitch';
import { ZoomIn } from '../../visor/visor-tools/zoom-in/zoom-in';
import { ZoomOut } from '../../visor/visor-tools/zoom-out/zoom-out';
import { Home } from '../../visor/visor-tools/home/home';



export const toolsDic: ToolsDictionary = {
  zoomIn: {
		toolComponent: ZoomIn
	},
	zoomOut: {
		toolComponent: ZoomOut
	},
	pitch: {
		toolComponent: Pitch
	},
	geolocator: {
		toolComponent: Geolocator
	},
	homeExtent: {
		toolComponent: Home
	},
}
