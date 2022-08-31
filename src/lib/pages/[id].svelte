<script>
    export /**
* @type {{ title: string | null | undefined; src: string | null | undefined; }}
*/
     let photo;
    import photos from './data';

</script>
  
  <h1>{photo.title}</h1>
  <img src = {photo.src} alt = {photo.title} />
   
  
  <style>
  img {
    width: 100%;
  }
  
  </style>