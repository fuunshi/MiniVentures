document.addEventListener('DOMContentLoaded', () => {
    const urlShortenerForm = document.getElementById('urlShortenerForm');
    const shortenButton = document.getElementById('shortenButton');
    const shortenedUrl = document.getElementById('shortenedUrl');

    urlShortenerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const url = urlShortenerForm.url.value;
        const response = await fetch('http://localhost:8000/shorten/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();
        shortenedUrl.innerText = `Shortened URL: ${data.shortened_url}`;
        shortenedUrl.classList.remove('hidden');
    });

    shortenButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const url = urlShortenerForm.url.value;
        const response = await fetch('http://localhost:8000/shorten/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();
        console.log(data.shortened_url);
        shortenedUrl.innerHTML = `Shortened URL: <a href="${data.shortened_url}" target="_blank">${data.shortened_url}</a>`;
        shortenedUrl.classList.remove('hidden');
    });
});
