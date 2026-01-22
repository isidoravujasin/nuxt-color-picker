import { describe, expect, it } from 'vitest'
import {
  clamp,
  clamp01,
  hsvToRgb,
  rgbToHex,
  hsvToHex,
  brightnessToPercentage,
} from '../utils/color'

describe('color utils', () => {
  it('clamp clamps within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-1, 0, 10)).toBe(0)
    expect(clamp(999, 0, 10)).toBe(10)
  })

  it('clamp01 clamps between 0 and 1', () => {
    expect(clamp01(-1)).toBe(0)
    expect(clamp01(0.2)).toBe(0.2)
    expect(clamp01(2)).toBe(1)
  })

  it('hsvToRgb converts primary hues', () => {
    expect(hsvToRgb({ h: 0, s: 1, v: 1 })).toEqual({ r: 255, g: 0, b: 0 })
    expect(hsvToRgb({ h: 120, s: 1, v: 1 })).toEqual({ r: 0, g: 255, b: 0 })
    expect(hsvToRgb({ h: 240, s: 1, v: 1 })).toEqual({ r: 0, g: 0, b: 255 })
  })

  it('rgbToHex formats correctly', () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#FF0000')
    expect(rgbToHex({ r: 0, g: 255, b: 0 })).toBe('#00FF00')
    expect(rgbToHex({ r: 0, g: 0, b: 255 })).toBe('#0000FF')
  })

  it('hsvToHex matches expected output', () => {
    expect(hsvToHex({ h: 0, s: 1, v: 1 })).toBe('#FF0000')
  })

  it('brightnessToPercentage converts 0..1 to 0..100', () => {
    expect(brightnessToPercentage(0)).toBe(0)
    expect(brightnessToPercentage(0.5)).toBe(50)
    expect(brightnessToPercentage(1)).toBe(100)
  })
})
