let album= {};
let picture = {};
let albumsId;
let albumsList = [];
let picturesList =[];
let URLList = [];
const albumsListEl = document.querySelector('#albumBlock');
const picturesListEl = document.querySelector('#picturesBlock');
const TITLE_ITEM_CLASS = '.title-item';
const TITLE_ITEM_TEMPLATE = document.getElementById('albumItemTemplate').innerHTML;
const PICTURE_ITEM_TEMPLATE = document.getElementById ('picturesItemTemplate').innerHTML;
const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';
const PICTURES_URL = 'https://jsonplaceholder.typicode.com/photos?albumId=';
albumsListEl.addEventListener('click', onAlbumNameClick);

init ();

function init(){
    fetchAlbumsBlock();
    if (albumsId===1){
        showPicture(albumsId) 
    }
}

function fetchAlbumsBlock() {
    fetch(ALBUMS_URL)
    .then((res) => res.json())
    .then((data) => {
        albumsList = data;
        renderAlbumList()
    })
}

function fetchPicturesBlock() {
    fetch(PICTURES_URL + albumsId)
    .then((res) => res.json())
    .then((data) => {
        picturesList = data;
    })
}

function renderAlbumList() {
    albumsListEl.innerHTML = albumsList.map(createNewAlbumLineHTML).join('\n');
}

function renderPicturesList() {
    picturesListEl.innerHTML = albumsList.map(createNewPicturesLineHTML).join('\n');
} 

function createNewAlbumLineHTML (album){
    return  TITLE_ITEM_TEMPLATE.replace('{{id}}', album.id)
            .replace('{{title}}', album.title)
}

function createNewPicturesLineHTML (picture){
    return  PICTURE_ITEM_TEMPLATE.replace('{{url}}', picture.url)
}

function onAlbumNameClick(el){
    albumsId = getAlbumElementId(el.target);
    showPicture(albumsId);
}

function getAlbumElementId(el){
    const albumElement = el.closest(TITLE_ITEM_CLASS);
    return albumElement && albumElement.dataset.id;
}      

function showPicture() {
    fetchPicturesBlock() ;
    let URLList = picturesList.forEach((obj)=>URLArr.push(obj.url));
    renderPicturesList(URLList);
}


