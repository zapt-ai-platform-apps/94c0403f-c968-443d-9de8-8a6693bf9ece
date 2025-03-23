export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                success: {
                    border: '#22c55e', // Green for successful developers
                    light: '#bbf7d0',
                },
                danger: {
                    border: '#ef4444', // Red for rug pull developers
                    light: '#fecaca',
                },
            },
        },
    },
    plugins: [],
};