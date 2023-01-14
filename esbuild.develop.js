const copyStaticFiles = require('esbuild-copy-static-files');

require('esbuild').serve({
    servedir: 'www',
}, {
    entryPoints: ['src/app.tsx'],
    bundle: true,
    outdir: 'www/js',
    plugins: [
        copyStaticFiles({
            src: './graphics',
            dest: './www/graphics'
        })
    ]
})