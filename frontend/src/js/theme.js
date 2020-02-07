import theme from '@rebass/preset';

export default Object.assign(theme, {
    colors: {
        text: '#000',
        background: '#fff',
        primary: '#07c',
        secondary: '#30c',
        muted: '#f6f6f9',
        gray: '#dddddf',
        highlight: '#ff3a41'
    },
    fonts: {
        body: 'Helmet, Freesans, sans-serif',
        heading: 'Helmet, Freesans, sans-serif',
        monospace: 'Menlo, monospace',
    },
    forms: {
        input: {
            color: 'primary',
            my: 2,
        },
        select: {
            borderRadius: 9999,
        },
        textarea: {},
        label: {},
        radio: {},
        checkbox: {},
    },
})
