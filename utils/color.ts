export type RGB = { r: number; g: number; b: number }
export type HSV = { h: number; s: number; v: number }

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function clamp01(value: number) {
  return clamp(value, 0, 1)
}

export function hsvToRgb(hsv: HSV): RGB {
  const h = ((hsv.h % 360) + 360) % 360
  const s = clamp01(hsv.s)
  const v = clamp01(hsv.v)

  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c

  let rp = 0, gp = 0, bp = 0

  if (h < 60) { rp = c; gp = x; bp = 0 }
  else if (h < 120) { rp = x; gp = c; bp = 0 }
  else if (h < 180) { rp = 0; gp = c; bp = x }
  else if (h < 240) { rp = 0; gp = x; bp = c }
  else if (h < 300) { rp = x; gp = 0; bp = c }
  else { rp = c; gp = 0; bp = x }

  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  }
}

function toHexByte(n: number) {
  const clamped = clamp(Math.round(n), 0, 255)
  return clamped.toString(16).padStart(2, '0')
}

export function rgbToHex(rgb: RGB) {
  return `#${toHexByte(rgb.r)}${toHexByte(rgb.g)}${toHexByte(rgb.b)}`.toUpperCase()
}

export function hsvToHex(hsv: HSV) {
  return rgbToHex(hsvToRgb(hsv))
}

export function brightnessToPercentage(v: number) {
  return Math.round(clamp01(v) * 100)
}
