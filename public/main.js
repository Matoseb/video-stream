const container = document.querySelector('#videoContainer')

function addVideo(youtubeId, parent) {

    const elem = document.createElement('div')
    parent.appendChild(elem)
    // https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html
    elem.innerHTML = /*html*/`
    <iframe
        src="https://www.youtube.com/embed/${youtubeId}"
        frameborder="0"
    ></iframe>
    <img class="image">
    <button class="screenshotBtn">Get screenshot</button>
    `

    const image = elem.querySelector('.image')

    elem.querySelector('.screenshotBtn').onclick = async () => {
        console.log('you clicked me');
        const resp = await fetch(`/api?youtubeId=${youtubeId}`)
        const { screenshot } = await resp.json();

        image.src = screenshot

        elem.appendChild(image)

    }
}


addVideo('JJqXeRFsLjE', container)