const config = {
    darkMode: ['class'],
    content: ['index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                background: 'rgb(var(--color-background-rgb) / <alpha-value>)',
                surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
                accent: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
                muted: 'rgb(var(--color-muted-rgb) / <alpha-value>)',
                ring: 'rgb(var(--color-ring-rgb) / <alpha-value>)',
                foreground: 'rgb(var(--color-foreground-rgb) / <alpha-value>)'
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif']
            },
            boxShadow: {
                glass: '0 20px 45px -20px rgba(var(--color-shadow-rgb), 0.45)'
            }
        }
    },
    plugins: []
};
export default config;
