const flickrParser = (images) => images.map(({ farm, server, id, secret, title }) => ({ title, url:`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg` }))
exports.flickrParser = flickrParser
