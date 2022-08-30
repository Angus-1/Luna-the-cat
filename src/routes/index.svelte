<script lang="ts" context="module">

</script>

<script lang="ts">
  import SEO from "svelte-seo";
  import Content from "$lib/pages/Content.svelte";
  import Home from "$lib/pages/Home.svelte";
  import Footer from "$lib/pages/Footer.svelte";

/* basic colors at  https://tailwindcss.com/docs/customizing-colors   more at  https://hypercolor.dev/   */ 
  let primaryBackground = "bg-gradient-to-r from-gray-900 to-green-300";
  let neutralBackground = "bg-neutral-200 dark:bg-neutral-900";
</script>

<SEO
  title="Luna's Gallery "
  description="Cat!"
  canonical=""
/>


<!--About me/bio-->
<Content />

<Footer backgroundClass={neutralBackground} />
