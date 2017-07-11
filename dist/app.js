console.log('meh')

const OK = 200;
const BOOM = 500;

const letThereBeLight = (img) => {
  const lightBox = document.querySelector('#light-box')
  lightBox.className = lightBox.className === 'turn-off' ? 'turn-on' : 'turn-off'
  
  const imageTitle = document.querySelector('#light-box .img-title')
  imageTitle.innerText = img.title

  const imageView = document.querySelector('#light-box .image-viewer')
  const imagine  = document.createElement('img')
  imagine.src = img.url
  imageView.appendChild(imagine)
}

const fetchImages = () => {
  const xmlHTTPRequest = new XMLHttpRequest()
  xmlHTTPRequest.open('GET', '/images', true)
  xmlHTTPRequest.onload = function () {
    const imageGrid = document.querySelector('.image-grid')    
    if (this.status === OK) {
      const images = JSON.parse(this.response)
      
      images.forEach((img, i) => {
        const divContainer = document.createElement('div')
	const image = document.createElement('img')
	image.onclick = () => letThereBeLight(img)
	image.src = img.url
	divContainer.appendChild(image) 
	imageGrid.appendChild(divContainer)
      })
    }
  }
  xmlHTTPRequest.send()
}

fetchImages()
