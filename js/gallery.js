import images from './gallery-items.js';



const createImageItem = (image) => {
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
        if (parentDivRef.classList.contains('is-open')) {
            parentDivRef.classList.remove('is-open');
        }
    }
}

const getImageURL = (target) => {
    return target.dataset.source;
};

const openImage = (elem) => {
    elem.preventDefault();
    const LightboxRef = document.querySelector('.lightbox');
    if (LightboxRef) {
        lightBoxAction('open');
    }

    const lightBoxImgRef = document.querySelector('.lightbox__image');
    console.log(lightBoxImgRef);
    lightBoxImgRef.src = getImageURL(elem.target);
}

const updLightBoxImg = (src, alt) => {
    
    const lightBoxImgRef = document.querySelector('.lightbox__image');
    lightBoxImgRef.src = '';
    lightBoxImgRef.alt = '';
    console.log('src ', src);
    console.log('src is true ', src === true);
    console.log('alt ', alt);
    console.log('alt is true', alt === true);
    if (src) { lightBoxImgRef.src = src };
    if (alt) { lightBoxImgRef.alt = alt };
    
}

const restLightBoxImg = () => {
    updLightBoxImg();
}

const lightBoxHandler = (elem) => {
    if (elem.target.nodeName === 'BUTTON') { // TODO : separete function for close modal ???
        lightBoxAction('close');
        restLightBoxImg();
    }
}



const liItemsArr = images.map((image) => createImageItem(image));
console.log(liItemsArr);


const divParentRef = document.querySelector('.gallery');
divParentRef.append(...liItemsArr);


const clickEvent = divParentRef.addEventListener('click', (elem) => openImage(elem));


const LightboxRef = document.querySelector('.lightbox__button');
LightboxRef.addEventListener('click', (elem) => lightBoxHandler(elem));