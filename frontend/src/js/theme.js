import theme from '@rebass/preset';

export default Object.assign(theme, {
    breakpoints: ['321px', '769px'],
    colors: {
        text: '#000',
        background: '#fff',
        primary: '#008aea',
        secondary: '#30c',
        muted: '#f6f6f9',
        gray: '#dddddd',
        lightgray: '#f5f5f5',
        highlight: '#ff3a41',
        backdrop: 'rgba(0,0,0,0.3)'
    },
    fonts: {
        body: 'Helmet, Freesans, sans-serif',
        heading: 'Helmet, Freesans, sans-serif',
        monospace: 'Menlo, monospace',
    },
    variants: {
        desktopmenu: {
            display: ['none', 'none', 'flex'],
            px: 2,
            color: 'primary',
            bg: 'white',
            alignItems: 'center'
        },
        mobilemenu: {
            display: ['block', 'block', 'none'],
            position: 'absolute',
            top: 0,
            right: 0,
            mt: 4,
            mr: 3,
            cursor: 'pointer'
        },
        mobilemenuopen: {
            display: ['block', 'block', 'none'],
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1000,
            pt: 4,
            px: 4,
            height: '100%',
            color: 'primary',
            bg: 'lightgray',
            alignItems: 'center'
        },
        link: {
            color: 'primary'
        },
        nav: {
            fontSize: 2,
            fontWeight: 'bold',
            display: 'inline-block',
            p: 2,
            color: 'inherit',
            textDecoration: 'none',
            ':hover,:focus,.active': {
                color: 'primary'
            }
        },
        mobilenav: {
            fontSize: 2,
            fontWeight: 'bold',
            display: 'block',
            py: 2,
            color: 'inherit',
            textDecoration: 'none',
            ':hover,:focus,.active': {
                color: 'primary'
            }
        },
        backdrop: {
            position: 'fixed',
            height: '100%',
            width: '100%',
            bg: 'backdrop',
            zIndex: 999,
            top: 0,
            left: 0
        }
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
        slab: {
            bg: 'gray',
            border: 'none',
            my: 2,
        }
    },
});
