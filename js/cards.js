// API Setup, Queries, and storage arrays
const baseUrl = 'https://api.pexels.com/v1/search';
const queries = [
    'nature',
    'landscape',
    'beach',
    'mountain',
    'city',
    'sky',
    'forest',
    'sunset',
    'ocean',
    'road',
    'river',
    'desert',
    'rainforest',
    'ocean',
    'arctic',
    'snow',
    'tropical',
    'holiday'];
let liked = [];
let disliked = [];



// Save the liked and disliked images in session storage
sessionStorage.setItem('liked', JSON.stringify(liked));
sessionStorage.setItem('disliked', JSON.stringify(disliked));

const imageLibrary = document.getElementById('imageLibrary');

// Initialize the image library
async function generateCards() {
    for (let i = 0; i < 12; i++) {
        const query = queries[i % queries.length];
        generateCard(query, i);
    }
}

async function generateCard(query, index) {
    const url = `${baseUrl}?query=${encodeURIComponent(query)}&per_page=999`;
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: window.apiKey,
            },
        });

        const data = await response.json();

        // Process the data for each query here
        if (data.photos.length > 0) {
            let randomIndex = Math.floor(Math.random() * data.photos.length);
            let randomImage = data.photos[randomIndex];
            // Check if the random image has already been liked or disliked
            while (liked.includes(randomImage.id) || disliked.includes(randomImage.id)) {
                randomIndex = Math.floor(Math.random() * data.photos.length);
                randomImage = data.photos[randomIndex];
            }
            // Create the <article> element
            const article = document.createElement('article');
            article.className = 'col';
            article.id = `card${randomImage.id}`;
            article.innerHTML = `
                <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 containerShadow"
                    style="background-image: url('${randomImage.src.portrait}');
                    background-repeat: no-repeat; background-size: 100% auto; min-height: 50vh;">
                    <div class="d-flex flex-column h-100 p-5 pb-3 text-white">
                        <h2 id="photoId" class="pt-5 mt-5 mb-4 display-6 lh-1
                        fw-bold invisible" style="text-shadow: 2px 2px 4px #000000;">${randomImage.id}</h2>
                        <ul class="d-flex list-unstyled mt-auto justify-content-between">
                            <li class="d-flex align-items-center">
                                <button class="btn btn-outline-none" id="like${randomImage.id}">
                                    <img src="https://img.icons8.com/fluency/512/checked.png" width="50px">
                                </button>
                            </li>
                            <li class="d-flex align-items-center">
                                <button class="btn btn-outline-none" id="dislike${randomImage.id}">
                                    <img src="https://img.icons8.com/fluency/512/cancel.png" width="50px">
                                </button>
                            </li>
                            <li class="d-flex align-items-center">
                                <button class="btn btn-outline-none" id="info${randomImage.id}" data-bs-toggle="modal"
                                data-bs-target="#infoModal${randomImage.id}">
                                    <img src="https://img.icons8.com/stickers/512/info.png" width="50px">
                                </button>
              </li>
            </ul>
          </div>
        </div>`;

            // Create the <aside> element
            const aside = document.createElement('aside');
            aside.className = 'modal fade';
            aside.id = `infoModal${randomImage.id}`;
            aside.tabIndex = '-1';
            aside.role = 'dialog';
            aside.setAttribute('aria-labelledby', `infoModalLabel${randomImage.id}`);
            aside.setAttribute('aria-hidden', 'true');
            aside.innerHTML = `
            <div class="modal-dialog modal-dialog-centered modal-full-width mx-auto"
            style="margin-bottom:7.5em;" role="document">
              <div class="modal-content">
                <div class="modal-header">
                        <h5 class="modal-title" style="font-size: 1em"
                        id="infoModalLabel${randomImage.id}">${randomImage.alt}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                        <img src="${randomImage.src.large2x}" class="img-fluid w-100 h-auto"
                        style="object-fit: contain; max-height: 70vh;" />
                        <div class="p-4">
                          <p>
                            Author: <a id="modalPhotoAuthor${randomImage.id}"
                            href="${randomImage.photographer_url}" target="_blank">${randomImage.photographer}</a>
                          </p>
                          <p>Photo ID: ${randomImage.id}</p>
                          <p>Original format: Width: ${randomImage.width} x Height: ${randomImage.height}</p>
                          <p>View original photo: <a id="modalPhotoLink${randomImage.id}"
                          href="${randomImage.url}" target="_blank">Click to view</a></p>
                        </div>
                </div>
                <div class="modal-footer d-flex justify-content-around">
                        <p style="font-size: 0.75em;">Images provided by:</p>
                        <a href="https://www.pexels.com" target="_blank">
                          <img src="https://images.pexels.com/lib/api/pexels.png"
                          class="img-fluid" style="max-width: 7.5em;" />
                        </a>
                </div>
              </div>
            </div>`;

            // Add event listener to remove modal backdrop when modal is hidden and enable scrolling on the body
            aside.addEventListener('hidden.bs.modal', () => {
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.remove();
                }
                // Enable scrolling on the body
                document.body.style.overflow = 'auto';
            });

            // Append the <article> and <aside> elements to the imageLibrary container
            imageLibrary.appendChild(article);
            imageLibrary.appendChild(aside);

            // Apply the gsap animation to the <article> element
            gsap.from(`#card${randomImage.id} `, { opacity: 0, duration: 3, delay: 1 });

            // Add event listeners to the buttons
            const likeButton = document.getElementById(`like${randomImage.id}`);
            const dislikeButton = document.getElementById(`dislike${randomImage.id}`);
            likeButton.addEventListener('click', () => {
                liked.push(randomImage.id);
                sessionStorage.setItem('liked', JSON.stringify(liked));
                fadeOutAndRemove(article, query, index); // Pass the query and index to the fadeOutAndRemove function
            });

            dislikeButton.addEventListener('click', () => {
                disliked.push(randomImage.id);
                sessionStorage.setItem('disliked', JSON.stringify(disliked));
                fadeOutAndRemove(article, query, index); // Pass the query and index to the fadeOutAnd Remove function
            });

            const infoButton = document.getElementById(`info${randomImage.id}`);
            infoButton.addEventListener('click', () => {
                const modal = document.getElementById(`infoModal${randomImage.id}`);
                const bootstrapModal = new bootstrap.Modal(modal);
                bootstrapModal.show();
            });

            // Check to make sure the photo id is not already liked or disliked, if so get a different image
            if (liked.includes(randomImage.id) || disliked.includes(randomImage.id)) {
                generateCard(query, index);
            }
            // Remove the selected image from the data.photos array to avoid duplicates
            data.photos.splice(randomIndex, 1);
        } else {
            // If the data.photos array is empty, display a message to the user
            imageLibrary.innerHTML = `<p class="text-center">No more images to display</p>`;
        }
    } catch (error) {
        console.log(error);
    }
}

function fadeOutAndRemove(article, query, index) {
    // Fade out the card
    gsap.to(`#card${index}`, { opacity: 0, duration: 1 });
    // Remove the card from the DOM after 1 second
    setTimeout(() => {
        article.remove();
        generateCard(query, index); // Generate a new card with the same query and index
        // Add gsap animation to the new card
    }, 1000);
}

window.addEventListener('load', generateCards);

// Card modal logic
document.addEventListener('DOMContentLoaded', function () {
    const infoButtons = document.querySelectorAll('[data-bs-toggle="modal"]'); // Update the selector to target all info buttons
    const infoModals = document.querySelectorAll('.modal'); // Update the selector to target all info modals
    const closeButton = document.querySelector('[data-bs-dismiss="modal"]');

    infoButtons.forEach((infoButton, index) => {
        infoButton.addEventListener('click', function () {
            infoModals[index].classList.add('show');
            infoModals[index].style.display = 'block';
            infoModals[index].setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', function () {
            infoModals.forEach((infoModal) => {
                infoModal.classList.remove('show');
                infoModal.style.display = 'none';
                infoModal.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('modal-open');
            });
        });
    }
});
