import birds1x from 'assets/birds-s.png';
import birds2x from 'assets/birds-m.png';
import birds3x from 'assets/birds-l.png';

export const makeImage = () => {
    let image =`<figure>
                <img src="/${birds3x}" srcset="/${birds1x} 200w, /${birds2x} 500w, /${birds3x} 1000w" alt="Image of birds" class="img-responsive">
                <figcaption class="photo-author">Photo by Glen Carrie on Unsplash</figcaption>
            </figure>`
    return  image;
  };

  export default {
    makeImage
  };

