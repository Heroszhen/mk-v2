import { defineConfig } from 'unocss'

export default defineConfig({
    preset: [],
    rules: [
        [/^bg-color-(\w+)$/, ([, color]) => ({ 'background-color': color })],
        [/^m2-(\d+)$/, ([, size]) => ({'margin': `${size}px` })],
        [/^m2-(\w+)-(\d+)$/, ([, position, size]) => ({[`margin-${position}`]: `${size}px` })],
        [/^p2-(\d+)$/, ([, size]) => ({'padding': `${size}px` })],
        [/^p2-(\w+)-(\d+)$/, ([, position, size]) => ({[`padding-${position}`]: `${size}px` })],
        [/^text-(\d+)$/, ([, size]) => ({'font-size': `${size}px` })],
        [/^color-(\w+)$/, ([, color]) => ({'color': `${color}` })],
    ],
})