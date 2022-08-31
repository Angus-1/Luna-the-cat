<script>
  import photos from '../lib/utils/data';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return /^\d+$/.test(param);
}
</script>
  

  <div class="img">
    {#each photos as {src,title,photo_id}}
      <!--now just need to get the specific image by id and show only it, perhaps using an if statement-->
    <img src={src} alt="{title}"  />
  {/each}


    </div>

  <style>
  img {
    width: 40%;
  }
  
  </style>