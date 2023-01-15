export interface CategoryStyle {
    border: string,
    text: string,
    raw: string
}

export enum COLORS {
    RED = 'red',
    ORANGE = 'orange',
    YELLOW = 'yellow',
    GREEN = 'green',
    BLUE = 'blue',
    PURPLE = 'purple',
    WHITE = 'white'
}

export const colorvariants = new Map<string, CategoryStyle>([
    [COLORS.RED, {border: 'border-rose-700', text: 'text-rose-700', raw: '#be123c'}],
    [COLORS.ORANGE, {border: 'border-orange-600', text: 'text-orange-600', raw: '#ea580c'}],
    [COLORS.GREEN, {border: 'border-lime-700', text: 'text-lime-700', raw: '#4d7c0f'}],
    [COLORS.WHITE, {border: 'border-white', text: 'text-white', raw: '#ffffff'}],
    [COLORS.PURPLE, {border: 'border-purple-600', text: 'text-purple-600', raw: '#9333ea'}],
    [COLORS.BLUE, {border: 'border-sky-700', text: 'text-sky-700', raw: '#0369a1'}]
]);