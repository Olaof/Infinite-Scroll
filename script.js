const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const legend = document.getElementById('legend')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash api
const count = 10;
const apiKey =    'KqMe3ADQMVyKt_O-Ax3JSSWNrENBji1kLXmWEgWUvH0';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count};
`

//check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log('after: images loaded!')
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready)
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links and photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages)
    photosArray.forEach((photo) => {
        // create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


// get photos from unsplash
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //catch error here
    }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

function githubCode() {
    const githubSource = "https://github.com/Olaof/Infinite-Scroll";
    window.open(githubSource, '_blank');
}

legend.addEventListener('click', githubCode);

// on load
getPhotos();