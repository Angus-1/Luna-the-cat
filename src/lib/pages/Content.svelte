<script lang="ts">
import Anchor from "$lib/components/Anchor.svelte";

  import Link from "$lib/components/Link.svelte";
  import Page from "$lib/components/Page.svelte";
  import Text from "$lib/components/Text.svelte";
  import { primaryBackground } from "$lib/utils/constants";

  export let backgroundClass = primaryBackground;


  /*=============== */

  import { tick } from 'svelte';
	import { crossfade, fade } from 'svelte/transition';
  import images from './data';
	import keyboard from './keyboard';
	let selected = '';
	let gallery: HTMLDivElement;
	const [send, receive] = crossfade({
		duration: () => 350,
		fallback: fade,
	})
	
	const handlePreviewClick = (imageURL: string) => {
		selected = imageURL
	}
	
	$: currentIdx = selected ? images.findIndex(d => d.banner_image === selected) : -1
	
	const shortcut = {
		'ArrowRight': async (e: { preventDefault: () => void; }) => {
			e.preventDefault()
			const nextIdx = (currentIdx + 1) % images.length;
			selected = images[nextIdx].banner_image
			await tick()
			const active = gallery.querySelector('[data-selected="true"]');
			if (active) {
				active.scrollIntoView();
			}
		},
		'ArrowLeft': async (e: { preventDefault: () => void; }) => {
			e.preventDefault();
			const nextIdx = currentIdx === 0 ? images.length - 1 : (currentIdx - 1) % images.length;
			selected = images[nextIdx].banner_image
			await tick()
			const active = gallery.querySelector('[data-selected="true"]');
			if (active) {
				active.scrollIntoView();
			}

  	}
	};
</script>

<Anchor id="content" />
  <div
	
	id="bg"
  >
		<div class="page-wrapper">
    <div class="gallery-container">
      {#each images as d (d.banner_image)}
          <div>
        {#if d.banner_image !== selected}
          <div role="img" aria-label="{d.name}" out:send={{key:d.banner_image}} in:receive={{key: d.banner_image}} on:click={() => handlePreviewClick(d.banner_image)} class="image" style="background-image: url({d.banner_image});" />		
        {/if}
        </div>
      {/each}	
      </div>
      
      {#if selected}
      <div class="image-viewer" on:click={(e) => {
        if (e.target === e.currentTarget) {
          selected = ''
        }	
      }}>
        <button on:click={() => {
          const nextIdx = (currentIdx - 1) % images.length;
          selected = images[nextIdx].banner_image
        }}>
        </button>
        <button on:click={() => {
              const nextIdx = (currentIdx + 1) % images.length;
          selected = images[nextIdx].banner_image
      
          }}>
    
        </button>
        <img in:receive={{key:selected}} out:send={{key: selected}} src="{selected}" />
        <div aria-label="Image Viewer" role="group" bind:this={gallery} use:keyboard={{ shortcut }} class="gallery" tabindex={0}>
          {#each images as image (image.name)}
            <div role="img" aria-label={image.name} data-selected={selected === image.banner_image} class:active={selected === image.banner_image} on:click={() => selected = image.banner_image} class="image" style="background-image:url({image.banner_image})" />
          {/each}
        </div>
      </div>
      {/if}
      <p class="visually-hidden" aria-atomic={true} aria-live="assertive">
        {#if images[currentIdx]}
         {images[currentIdx].name}
        {/if}
      </p>
	</div>
</div>



<style>

#bg {
    /* The image used background-image: url("/assets/images/background1.jpg"); */
    background-image: linear-gradient(217deg, rgb(40, 112, 101), rgba(255,0,0,0) 70.71%),
      linear-gradient(127deg, rgba(0, 0, 0, 0.8), rgba(0,255,0,0) 70.71%),
      linear-gradient(336deg, rgba(75, 75, 75, 0.8), rgba(0,0,255,0) 70.71%);
    
  }

  * { box-sizing: border-box; }
/* 	img { max-width: 100%; } */
	
	.gallery-container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 15px;
	}
	
	.visually-hidden {
		visibility: hidden;
	}
	
	.image {
		width: 90%;
		height: 300px;
		background: center / cover no-repeat;
		border-radius: 10px;

	}
	
	.gallery {
		display: inline-flex;
		flex-wrap: nowrap;
		width: 100%;
		overflow-x: auto;
	}
	
	.gallery > .image {
		flex-shrink: 0;
		margin-right: 8px;
		width: 100px;
		height: 100px;
		
	}
	
	.image-viewer {
		padding: 20px;
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: 0;
		right: 0;
		top: 0;
		background-color: rgba(100, 100, 100, 0.8);
	}
	
	.active {
		border: 3px solid #000;
	}
	
	.image-viewer > img {
		max-height: 70%;
	}
</style>


