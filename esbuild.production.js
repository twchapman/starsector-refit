require('esbuild').build({
    entryPoints: ['src/app.jsx'],
    bundle: true,
    minify: true,
    outdir: 'www/js',
}).catch(() => process.exit(1))