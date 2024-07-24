# Entertainment web app

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Tutorial](#tutorial)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Built as a full-stack application
- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Navigate between Home, Movies, TV Series, and Bookmarked Shows pages
- Add/Remove bookmarks from all movies and TV series
- Search for relevant shows on all pages
- Register/Login to an account to be able to bookmark their favorite movie or TV series

### Screenshot

![./client/public/assets/bmk.png](./client/public/assets/bmk.png)
![./client/public/assets/nana.png](./client/public/assets/nana.png)

### Links

- Solution URL: [https://github.com/12Ricky0/entertainment-web-app.git](https://github.com/12Ricky0/entertainment-web-app.git)
- Live Site URL: [https://entertainment-web-app-6i77.vercel.app/](https://entertainment-web-app-6i77.vercel.app/)

## My process

### Tutorial:

1. **Clone the Repository**: Provide a command to clone the repository.
2. **Navigate to the Project Directory**: Navigate into the project directory.
3. **Install Dependencies**: Provide a command to install project dependencies.
4. **Run the Tests**: Provide a command to run the tests.

### Detailed Example

````markdown
## Running Tests

To run tests, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/your-repo-name.git
   ```

2. **Navigate to the project directory**:

   ```sh
   cd your-repo-name
   ```

3. **Install dependencies**:

   ```sh
   npm install
   ```

4. **Run the tests**:
   ```sh
   npm test
   ```

### Example Test Output

````sh
> your-project-name@1.0.0 test /path/to/your/project
> mocha

  Your Project Tests
    ✓ should pass this test
    ✓ should pass another test

  2 passing (100ms)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- MongoDB
- Mongoose
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

```css
.loading-spinner {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
````
````

```js
const proudOfThisFunc = () => {
  console.log("🎉");
};

const bookmarkedMovies = data.filter((movie) => {
  return (
    bookmarkedResult &&
    bookmarkedResult.some((bookmark) => movie.title.includes(bookmark))
  );
});
```

### Continued development

- MERN Stack: Build more advanced projects as a full stack so I can easily integrate the backend whe the frontend.
- React Router: Explore the various aspects of the react router.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

## Author

- Frontend Mentor - [@12Ricky0](https://www.frontendmentor.io/profile/12Ricky0)
- Instagram - [@temple4b](https://www.instagram.com/temple4b)
