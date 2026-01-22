import { describe, expect, it } from 'vitest'
import { normalizeHue, hueSatFromPoint } from '../utils/wheelMath'

describe('wheelMath utils', () => {
  it('normalizeHue normalizes negative/overflow values', () => {
    expect(normalizeHue(0)).toBe(0)
    expect(normalizeHue(360)).toBe(0)
    expect(normalizeHue(-1)).toBe(359)
    expect(normalizeHue(721)).toBe(1)
  })

  it('hueSatFromPoint returns null outside wheel', () => {
    // size=100 => radius=50, point far away => outside
    expect(hueSatFromPoint(0, 0, 100)).toBeNull()
  })

  it('hueSatFromPoint returns saturation ~0 in center', () => {
    const res = hueSatFromPoint(50, 50, 100)
    expect(res).not.toBeNull()
    expect(res!.saturation).toBeCloseTo(0, 5)
  })

  it('hueSatFromPoint returns saturation ~1 on edge', () => {
    // right edge: (100,50) should be on the circle
    const res = hueSatFromPoint(100, 50, 100)
    expect(res).not.toBeNull()
    expect(res!.saturation).toBeCloseTo(1, 5)
  })
})
