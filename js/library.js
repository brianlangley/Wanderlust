// Library cards logic
const favourites = document.getElementById('favourites');
const liked = JSON.parse(sessionStorage.getItem('liked'));

async function generateFavourites() {
    if (liked) {
        for (let i = 0; i < liked.length; i++) {
            const photoId = liked[i];
            generateCard(photoId);
        }
    }
}

async function generateCard(photoId) {
    // Connect to the API
    const url = `https://api.pexels.com/v1/photos/${photoId}`;
    const response = await fetch(url, {
        headers: {
            Authorization: window.apiKey,
        },
    });
    const data = await response.json();

    // Create the <div> element for the card
    const cardDiv = document.createElement('div');
    cardDiv.className = 'col';

    // Create the <div> element for the card content
    const cardContentDiv = document.createElement('div');
    cardContentDiv.className = 'card containerShadow';

    // Create the <img> element for the photo
    const photoImg = document.createElement('img');
    photoImg.className = 'card-img-top';
    photoImg.src = data.src.portrait;
    photoImg.alt = '...';
    cardContentDiv.appendChild(photoImg);

    // Create the <div> element for the card body
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body d-flex justify-content-between';

    // Create a <div> for the left side content (View button)
    const leftDiv = document.createElement('div');
    leftDiv.className = 'd-flex align-items-center';

    // Create the "View Photo" button
    const viewPhotoBtn = document.createElement('a');
    viewPhotoBtn.href = data.url;
    viewPhotoBtn.className = 'btn btn-primary pr-2';
    viewPhotoBtn.target = '_blank';
    viewPhotoBtn.textContent = 'View';
    leftDiv.appendChild(viewPhotoBtn);

    cardBodyDiv.appendChild(leftDiv);

    // Create a <div> for the right side content (Delete button)
    const rightDiv = document.createElement('div');
    rightDiv.className = 'd-flex align-items-center';

    // Create the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.id = `deleteFav${data.id}`;
    deleteBtn.className = 'btn btn-sm btn-outline-secondary';
    deleteBtn.textContent = 'Delete';
    rightDiv.appendChild(deleteBtn);

    cardBodyDiv.appendChild(rightDiv);

    // Add event listener to the delete button
    deleteBtn.addEventListener('click', () => {
        removeCard(photoId);
        // Refresh the page
        window.location.reload();
    });

    // Append card body to the card content
    cardContentDiv.appendChild(cardBodyDiv);

    // Append card content to the card div
    cardDiv.appendChild(cardContentDiv);

    // Append card div to the favourites container
    favourites.appendChild(cardDiv);
}

function removeCard(photoId) {
    const updatedLiked = liked.filter((id) => id !== photoId);
    sessionStorage.setItem('liked', JSON.stringify(updatedLiked));

    const card = document.getElementById(`card${photoId}`);
    if (card) {
        card.remove();
    }
}

// for each loop of the liked array
for (let i = 0; i < liked.length; i++) {
    const photoId = liked[i];
    generateCard(photoId);
}