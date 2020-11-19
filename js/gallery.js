import images from './gallery-items.js';


let currentImageIndex = 0;

const createImageItem = (image, index) => {
    const listItem = document.createElement('li');
    const itemLink = document.createElement('a');
    const itemImage = document.createElement('img');
    listItem.classList.add('gallery__item');
    itemLink.classList.add('gallery__link');
    itemLink.href = image.preview;
    itemImage.classList.add('gallery__image');
    itemImage.alt = image.description;
    itemImage.src =  image.preview;
    itemImage.setAttribute('data-source', image.original);
    itemImage.setAttribute('data-index', index);
    itemLink.appendChild(itemImage);
    listItem.appendChild(itemLink);
    return listItem;
}

const lightBoxAction = (action) => {
    const parentDivRef = document.querySelector('.lightbox');
    if (action === 'open') {
         if (!(parentDivRef.classList.contains('is-open'))) {
            parentDivRef.classList.add('is-open');
        }
    } else if (action === 'close') {
        resetLightBoxImg();
        if (parentDivRef.classList.contains('is-open')) {
            parentDivRef.classList.remove('is-open');
        }
    }
}

const getImageData = (target) => {
    return [target.dataset.source, target.alt];
};

const openImage = (elem) => {
    elem.preventDefault();
    const LightboxRef = document.querySelector('.lightbox');
    if (LightboxRef) {
        lightBoxAction('open');
    }
    const lightBoxImgRef = document.querySelector('.lightbox__image');
    console.log(lightBoxImgRef);
    currentImageIndex = elem.target.dataset.index;
    updLightBoxImg (...getImageData(elem.target));
}

const openImageByIndex = (index, images) => {
 updLightBoxImg (images[Number(index)].original, images[Number(index)].description);
}

const updLightBoxImg = (src, alt) => {  
    const lightBoxImgRef = document.querySelector('.lightbox__image');
    lightBoxImgRef.src = '';
    lightBoxImgRef.alt = '';
    if (src) { lightBoxImgRef.src = src };
    if (alt) { lightBoxImgRef.alt = alt };   
}

const resetLightBoxImg = () => {
    updLightBoxImg();
}

const lightBoxHandler = (event) => {
    if (event.target.nodeName === 'BUTTON' || event.target.classList.contains('lightbox__overlay')) { 
        lightBoxAction('close');
    }
}

const keyEventHandler = (event) => {
    console.log(event.code);
    if (event.code === 'Escape') {
        lightBoxAction('close');

    } else if (event.code === 'ArrowRight') {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex = Number(currentImageIndex) + 1;
        openImageByIndex(currentImageIndex, images);   
        }
        
    } else if (event.code === 'ArrowLeft') {
        if (currentImageIndex > 0) {
            currentImageIndex = Number(currentImageIndex) - 1;
            openImageByIndex(currentImageIndex, images);
        }
        
    }
}



const liItemsArr = images.map((image, index) => createImageItem(image, index));
console.log(liItemsArr);


const divParentRef = document.querySelector('.gallery');
divParentRef.append(...liItemsArr);


divParentRef.addEventListener('click', (event) => openImage(event));


const LightboxRef = document.querySelector('.lightbox');
LightboxRef.addEventListener('click', (event) => lightBoxHandler(event));

window.addEventListener('keyup', (event) => keyEventHandler(event)) 