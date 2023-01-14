const copyStaticFiles = require('esbuild-copy-static-files');

require('esbuild').build({
    entryPoints: ['src/app.tsx'],
    bundle: true,
    minify: true,
    outdir: 'www/js',
    plugins: [
        copyStaticFiles({
            src: './graphics',
            dest: './www/graphics'
        })
    ]
}).catch(() => process.exit(1))