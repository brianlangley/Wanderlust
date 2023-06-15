# Wanderlust - Photo Liking App

## What is Wanderlust?
Wanderlust is a strong desire or impulse to travel and explore the world. It embodies the excitement and curiosity to discover new places, cultures, and experiences. The Wanderlust app aims to bring this sense of adventure and exploration into the digital realm by allowing users to browse and like captivating photos from various destinations.

## Project Description

Wanderlust is a photo liking application developed in vanilla JavaScript. Inspired by platforms such as Pinterest, it provides users with a visual journey through a collection of stunning photographs. Users can browse through a diverse range of images, like their favourite photos, and store them as personal favourites.

### The project consists of two main components

#### cards.js

The `cards.js` script handles the API setup, queries, and storage arrays. It utilises the Pexels API to fetch a curated list of high-quality photos related to nature, landscapes, beaches, mountains, cities, and more. These photos are displayed as interactive cards, allowing users to like or dislike each image. Additionally, detailed information about a photo can be viewed in a modal dialog, by clicking the blue information button.

Features of `cards.js`:

- Integration with the Pexels API to retrieve captivating photos.
- Generation and display of interactive photo cards.
- Like and dislike functionality for each photo.
- Display of detailed information about each photo in a modal dialog.

#### library.js

The `library.js` script manages the user's favourite photos. It retrieves the liked photos from session storage and generates the corresponding cards, presenting them in the "Library" section. Users can easily remove a photo from their favourites library if desired.

Features of `library.js`:

- Retrieval of liked photos from session storage.
- Generation and display of cards for each liked photo in the "Favorites" section.
- Ability to remove photos from the favorites list.

### Usage

To explore and utilise the Wanderlust app, follow these steps:

1. Open the application in a web browser.

2. The `cards.js` script will fetch a collection of photos and display them.

3. Click the "Like" button on a card to add the photo to your favourites library.

4. Click the "Dislike" button on a card to remove the photo from your favourites library.

5. Navigate to the "Library" section to view all your liked photos.

6. Click the "Delete" button on a saved photo to remove it from your favourites.

### Installation

**Important: Keep your API key secret! Do not share it publicly.**

To set up the Wanderlust app locally, follow these steps:

1. Clone the repository to your local machine using the following command: git clone https://github.com/brianlangley/Wanderlust.git

2. Open the `index.html` file in a web browser.

3. Ensure you have obtained an API key from Pexels. If you don't have one, please visit the [Pexels API](https://www.pexels.com/api/) website to sign up and obtain an API key.

4. In the `config.js` file, replace `'YOUR_API_KEY'` with your actual API key:

```javascript
// Fill in your API key below (link to Pexels API: https://www.pexels.com/api/)
window.apiKey = 'YOUR_API_KEY';
```
Note: Do not share your API key publicly or expose it in any way. Treat it as confidential information.

5. Save the `config.js` file.

6. Refresh the `index.html` page in your web browser.

7. The Wanderlust app is now ready to use!

### Screenshots

Here are a few screenshots of the Wanderlust app:

Homepage:
![Homepage](./screenshots/home.png)

Library:
![Library](./screenshots/library.png)

### Dependencies

The Wanderlust app is built using vanilla JavaScript, HTML, and CSS.

While it does not rely on external libraries or frameworks that need to be downloaded, it utilizes CDNs (Content Delivery Networks) for some resources. This approach was chosen for ease of viewing experience.

These being:
- Bootstrap CSS
- GSAP (GreenSock Animation Platform)

### Compatibility

The application is compatible with modern web browsers that support JavaScript.

### Credits

The Wanderlust app utilizes the Pexels API to fetch the photos. Visit Pexels for more information.

### License

The Wanderlust app is released under the MIT License. You are free to use, modify, and distribute the app in accordance with the terms of the license.
