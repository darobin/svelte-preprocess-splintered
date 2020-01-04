
# svelte-preprocess-splintered

This gives you Svelte components, but with HTML/Svelte, CSS, and JS in separate files.

I like the idea of components that contain everything, but I like having the option not to do it
that way. Also, I have found it hard to get Atom to do the right thing in all cases.

With this pre-processor, your regular Svelte files will work exactly the same. However, whenever
there is a file of the same name but with extension `.mjs`, `.js`, or `.css` it will get prepended
to your Svelte file wrapped in respectively `<script context="module">`, `<script>`, and `<style>`.

You should keep importing `.svelte` as per usual. This module really just pre-bundles JS and CSS
into Svelte files.
