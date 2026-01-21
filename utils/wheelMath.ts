import { clamp01 } from './color'

export function normalizeHue(h: number) {
  return ((h % 360) + 360) % 360
}

export function hueSatFromPoint(
  x: number,
  y: number,
  size: number
): { hue: number; saturation: number } | null {
  const r = size / 2
  const dx = x - r
  const dy = y - r
  const dist = Math.sqrt(dx * dx + dy * dy)

  if (dist > r) return null

  const saturation = clamp01(dist / r)

  const angle = Math.atan2(dy, dx)
  const rawHue = (angle * 180) / Math.PI
  const hue = normalizeHue(rawHue + 90)

  return { hue, saturation }
}
