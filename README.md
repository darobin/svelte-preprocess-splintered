
# svelte-preprocess-splintered

This gives you Svelte components, but with HTML/Svelte, CSS, and JS in separate files.

I like the idea of components that contain everything, but I like having the option not to do it
that way. Also, I have found it hard to get Atom to do the right thing in all cases.

With this pre-processor, your regular Svelte files will work exactly the same. However, whenever
there is a file of the same name but with extension `.mjs`, `.js`, or `.css` it will get prepended
to your Svelte file wrapped in respectively `<script context="module">`, `<script>`, and `<style>`.

You should keep importing `.svelte` as per usual. This module really just pre-bundles JS and CSS
into Svelte files.

## Installation

Just the usual: `npm install -D --save svelte-preprocess-splintered`.

## Usage

Importing `svelte-preprocess-splintered` returns a function, and calling that function will
produce a preprocessor which you can pass to Svelte's `preprocess` option (which can accept this
value or an array of such values). This works in Rollup, Sapper, `svelte-loader`… Here is an
example `rollup.config.js` using splintered Svelte:

```js
import svelte from 'rollup-plugin-svelte';
import splintered from 'svelte-preprocess-splintered'

export default {
  …,
  plugins: [
    svelte({
      preprocess: splintered(),
      …,
    }),
  ],
};
```
