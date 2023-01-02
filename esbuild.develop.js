require('esbuild').serve({
    servedir: 'www',
}, {
    entryPoints: ['src/app.jsx'],
    bundle: true,
    outdir: 'www/js',
})