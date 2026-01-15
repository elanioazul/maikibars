
export const pulsingDot = {
  width: 100,
  height: 100,
  data: new Uint8Array(100 * 100 * 4),
  map: null as any,

  onAdd: function (map: any) {
    this.map = map;
  },

  render: function () {
    const duration = 1500;
    const t = (performance.now() % duration) / duration;
    const radius = (100 / 2) * 0.3;
    const outerRadius = (100 / 2) * 0.7 * t + radius;

    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const context = canvas.getContext('2d')!;

    context.clearRect(0, 0, this.width, this.height);

    // Draw Pulse
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
    context.fillStyle = `rgba(210, 8, 250, ${1 - t})`;
    context.fill();

    // Draw Center
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = 'rgb(210, 8, 250)';
    context.strokeStyle = 'white';
    context.lineWidth = 2;
    context.fill();
    context.stroke();

    this.data = new Uint8Array(context.getImageData(0, 0, this.width, this.height).data.buffer);
    this.map.triggerRepaint();
    return true;
  }
};
