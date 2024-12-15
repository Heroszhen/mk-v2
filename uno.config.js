import { defineConfig } from 'unocss'

export default defineConfig({
    preset: [],
    rules: [
        [/^bg-color-(\w+)$/, ([, color]) => ({ 'background-color': color })],
        [/^z-m-(\d+)$/, ([, size]) => ({'margin': `${size}px` })],
        [/^z-m-(\w+)-(\d+)$/, ([, position, size]) => ({[`margin-${position}`]: `${size}px` })],
        [/^z-p-(\d+)$/, ([, size]) => ({'padding': `${size}px` })],
        [/^z-p-(\w+)-(\d+)$/, ([, position, size]) => ({[`padding-${position}`]: `${size}px` })],
        [/^text-(\d+)$/, ([, size]) => ({'font-size': `${size}px` })],
        [/^color-(\w+)$/, ([, color]) => ({'color': `${color}` })],
        [/^zindex-(\d+)$/, ([, index]) => ({'z-index': `${index}` })],
        [/^flex-(\w+)-(\w+)$/, ([, justify, align]) => ({
            'display': 'flex',
            'justify-content': `${justify}`,
            'align-items': `${align}`
        })],
        [/^z-w-(\d+)$/, ([, percentage]) => ({'width': `${percentage}%` })],
        [/^z-h-(\d+)$/, ([, percentage]) => ({'height': `${percentage}%` })],
        [/^width-(\d+)$/, ([, size]) => ({'width': `${size}px` })],
        [/^height-(\d+)$/, ([, size]) => ({'height': `${size}px` })],
        [/^opacity-(\d+)$/, ([, value]) => ({'opacity': `0.${value}` })],
        [/^cursor-(\w+)$/, ([, value]) => ({'cursor': `${value}` })],
        [/^zp-(\w+)-(\d+)$/, ([, position, value]) => ({[`${position}`]: `${value}px` })],
    ],
})