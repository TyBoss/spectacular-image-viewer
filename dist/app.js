console.log('meh')

const OK = 200;
const BOOM = 500;
const viewerState = {
  images: [],
  currentIdx: null
}

const letThereBeLight = (index) => {
  viewerState.currentIdx = index
  
  const lightBox = document.querySelector('#light-box')
  lightBox.className = lightBox.className === 'turn-off' ? 'turn-on' : 'turn-off'
  
  setImageInBox(index)  
}

const setImageInBox = (index) => {
  const img = viewerState.images[index]
  const imageTitle = document.querySelector('#light-box .img-title')
  imageTitle.innerText = img.title

  const imageView = document.querySelector('#light-box .image-viewer')
  imageView.innerHTML = null
  const imagine  = document.createElement('img')
  imagine.src = img.url
  imageView.appendChild(imagine)

  const moveToPrevious = document.querySelector('#light-box .previous')
  const moveToNext = document.querySelector('#light-box .next')
  
  if (index === 0) {
    moveToPrevious.classList.add('hide-me')
  } else {
    moveToPrevious.classList.remove('hide-me')
    moveToPrevious.onclick = () => setImageInBox(index - 1)
  }

  if (index === viewerState.images.length - 1) {
    moveToNext.classList.add('hide-me')
  } else {
    moveToNext.classList.remove('hide-me')
    moveToNext.onclick = () => setImageInBox(index + 1)
  }
}

const fetchImages = () => {
  const xmlHTTPRequest = new XMLHttpRequest()
  xmlHTTPRequest.open('GET', '/images', true)
  xmlHTTPRequest.onload = function () {
    if (this.status === OK) {
      viewerState.images = JSON.parse(this.response)
      renderImages()
    }
  }
  xmlHTTPRequest.send()
}

const renderImages = () => {
  const imageGrid = document.querySelector('.image-grid')    
  viewerState.images.forEach((img, i) => {
    const divContainer = document.createElement('div')
    const image = document.createElement('img')   
    image.onclick = () => letThereBeLight(i)
    image.src = img.url
    divContainer.appendChild(image) 
    imageGrid.appendChild(divContainer)
  })
}

fetchImages()
