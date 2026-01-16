import { toolType } from "../enums/tool-type";
import { IReadVisor } from "../interfaces/visor.interface";

export const visorConfig: IReadVisor = {
  tools: [
    {
      id: 0,
      name: 'Zoom in',
      key: 'zoomIn',
      description: 'Zoom in',
      widget: () =>
        import(
          '@visor/visor-tools/zoom-in/zoom-in'
        ).then((c) => c.ZoomIn),
      config: {
        icon: 'add',
        tooltipMessage: 'zoom in',
        type: toolType.buttonTool,
        active: true,
      },
    },
    {
      id: 1,
      name: 'Zoom out',
      key: 'zoomOut',
      description: 'Zoom out',
      widget: () =>
        import(
          '@visor/visor-tools/zoom-out/zoom-out'
        ).then((c) => c.ZoomOut),
      config: {
        icon: 'remove',
        tooltipMessage: 'zoom out',
        type: toolType.buttonTool,
        active: true,
      },
    },
    {
      id: 2,
      name: 'Pitch',
      key: 'pitch',
      description: 'Pitch',
      widget: () =>
        import(
          '@visor/visor-tools/pitch/pitch'
        ).then((c) => c.Pitch),
      config: {
        icon: 'navigation',
        tooltipMessage: 'adjust pitch',
        type: toolType.buttonTool,
        active: true,
      },
    },
    {
      id: 3,
      name: 'Extensión predeterminada',
      key: 'homeExtent',
      description: 'Extensión predeterminada',
      widget: () =>
        import(
          '@visor/visor-tools/home/home'
        ).then((c) => c.Home),
      config: {
        icon: 'home',
        tooltipMessage: 'Home',
        type: toolType.buttonTool,
        active: true,
      },
    },
    {
      id: 4,
      name: 'Geolocator',
      key: 'geolocator',
      description: 'Localizador de posición',
      widget: () =>
        import(
          '@visor/visor-tools/geolocator/geolocator'
        ).then((c) => c.Geolocator),
      config: {
        icon: 'location_searching',
        tooltipMessage: 'geolocalización',
        type: toolType.buttonTool,
        active: true,
      },
    },
  ]
}
