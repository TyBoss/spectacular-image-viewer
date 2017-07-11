const assert = require('assert')
const parsers = require('../../libs/image-parsers')

describe('flickrParser', () => {
  it('returns the title and url from image metadata', () => {
    const images = [
      {"id":"34949204705","owner":"136089675@N06","secret":"aeb4049204","server":"4270","farm":5,"title":"Sharingan","ispublic":1,"isfriend":0,"isfamily":0},
      {"id":"34293475442","owner":"146794115@N08","secret":"8cc87441ff","server":"4189","farm":5,"title":"Uchiha Itachi","ispublic":1,"isfriend":0,"isfamily":0},
      {"id":"33805767512","owner":"128325870@N02","secret":"63f53b748c","server":"2891","farm":3,"title":"07","ispublic":1,"isfriend":0,"isfamily":0}
    ]

    const expectedResult = [
      {
	"title": "Sharingan",
        "url": "https://farm5.staticflickr.com/4270/34949204705_aeb4049204.jpg"
      },
      {
        "title": "Uchiha Itachi",
        "url": "https://farm5.staticflickr.com/4189/34293475442_8cc87441ff.jpg"
      },
      {
        "title": "07",
        "url": "https://farm3.staticflickr.com/2891/33805767512_63f53b748c.jpg"
      }
    ]
	    
    const result = parsers.flickrParser(images)
    assert.deepEqual(result, expectedResult)
  })
})
