console.log('meh')

const OK = 200;
const BOOM = 500;

const keyCodes = {
  ESCAPE: 27,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
}
const viewerState = {
  images: [],
  keyAction: {
    [keyCodes.ESCAPE]: () => {
      const lightBox = document.querySelector('#light-box')
      lightBox.className = 'turn-off'
    }
  }
}

const setUpActions = () => {
  this.addEventListener('keyup', (e) => {
    if (viewerState.keyAction[e.keyCode]) {
      viewerState.keyAction[e.keyCode]()
    } 
  }, false)

  const search = document.querySelector('#search-btn')
  search.onclick = () => {
    const tbx = document.querySelector('#search-tbx')
    const imageGrid = document.querySelector('.image-grid')
    imageGrid.innerHTML = null
    fetchImages(tbx.value)
  }
}

const toggleLoadingGenjutsu = () => {
  const loader = document.querySelector('.loader')
  loader.classList.toggle('loading')
}

const setUpNavigationActions = (key, action) => {
  viewerState.keyAction[key] = action 
}

const removeNavigationAction = (key) => {
  delete viewerState.keyAction[key]
}

const showError = () => {
  const imageGrid = document.querySelector('.image-grid')
  imageGrid.classList.toggle('error')
  imageGrid.innerText = 'An error has occurred. No images for you :('
}

const letThereBeLight = (index) => {
  const lightBox = document.querySelector('#light-box')
  lightBox.className = lightBox.className === 'turn-off' ? 'turn-on' : 'turn-off'
 
  const closeBtn =  document.querySelector('#light-box .close-btn')
  closeBtn.onclick = viewerState.keyAction[keyCodes.ESCAPE] 
  setImageInBox(index)  
}

const setImageInBox = (index) => {
  const img = viewerState.images[index]
  const imageTitle = document.querySelector('#light-box .img-title')
  imageTitle.innerText = img.title
  imageTitle.title = img.title

  const imageView = document.querySelector('#light-box .image-viewer')
  imageView.innerHTML = null
  
  const imagine  = document.createElement('img')
  imagine.src = img.url
  imageView.appendChild(imagine)

  const moveToPrevious = document.querySelector('#light-box .previous-btn')
  const moveToNext = document.querySelector('#light-box .next-btn')
  
  if (index === 0) {
    moveToPrevious.classList.add('hide-me')
    removeNavigationAction(keyCodes.LEFT_ARROW)
  } else {
    moveToPrevious.classList.remove('hide-me')
    const callPrevious = () => setImageInBox(index - 1) 
    moveToPrevious.onclick = callPrevious
    setUpNavigationActions(keyCodes.LEFT_ARROW, callPrevious)
  }

  if (index === viewerState.images.length - 1) {
    moveToNext.classList.add('hide-me')
    removeNavigationAction(keyCodes.RIGHT_ARROW)
  } else {
    moveToNext.classList.remove('hide-me')
    const callNext = () => setImageInBox(index + 1)
    moveToNext.onclick = callNext
    setUpNavigationActions(keyCodes.RIGHT_ARROW, callNext)
  }
}

const fetchImages = (text) => { 
  toggleLoadingGenjutsu()
  const xmlHTTPRequest = new XMLHttpRequest()
  xmlHTTPRequest.open('GET', text ? '/images/' + text : '/images', true)
  xmlHTTPRequest.onload = function () {
    switch(this.status) {
      case OK:
        viewerState.images = JSON.parse(this.response)
        renderImages()
        toggleLoadingGenjutsu()
        break
      case BOOM:
        toggleLoadingGenjutsu()
        showError()
        break
      default:
        console.log(this.status)
        return
    }
  }
  xmlHTTPRequest.send()
}

const renderImages = () => {
  const imageGrid = document.querySelector('.image-grid')    
  viewerState.images.forEach((img, i) => {
    const divContainer = document.createElement('div')
    const image = document.createElement('img')   
    divContainer.onclick = () => letThereBeLight(i)
    image.src = img.url
    divContainer.appendChild(image) 
    imageGrid.appendChild(divContainer)
  })
}

this.onload = () => {
  fetchImages()
  setUpActions()
}
