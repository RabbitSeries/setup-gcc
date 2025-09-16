import esbuild from "esbuild"
import fg from "fast-glob"
import fs from "node:fs"

const src = fg.globSync(["src/*.ts", "!node_modules"])
console.log(`Found files: ${src}`)
const outDirectory = "dist";
if (fs.existsSync(outDirectory)) {
    fs.rmSync(outDirectory, { force: true, recursive: true })
}

async function build() {
    await esbuild.build({
        target: "esnext",
        entryPoints: src,
        platform: "node",
        format: "cjs",
        bundle: true,
        outbase: "src",
        outdir: outDirectory,
        sourcemap: false
        // treeShaking: true // true if bundle or format is iife
    })
    console.log(`bundle finished`)
}
build()