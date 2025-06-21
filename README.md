# 🎬 FlixFlex

**FlixFlex** is a mobile application built with **React Native (Expo)** that allows users to explore and discover movies and series from **The Movie Database (TMDb)**. It features smooth navigation, beautiful UI, and essential features like authentication, favorites, and search.

---

## 🚀 Features

### 📽️ Movies Screen
- Trending movies
- Upcoming movies
- Top 5 rated movies
- Discover section with various categories  
<img src="https://github.com/user-attachments/assets/970c0381-8f04-4e9a-befe-a4f53399abb9" width="200"/>

---

### 📺 Series Screen
- Trending series
- Upcoming series for the week
- Top 5 rated series
- Discover section with category filters  
<img src="https://github.com/user-attachments/assets/b568bf48-2737-480d-b050-ee12f932274f" width="200"/>

---

### ❤️ Favorites
- Tap the heart icon to save movies/series
- Favorites saved locally with `AsyncStorage`  
<img src="https://github.com/user-attachments/assets/52e9fb31-0995-4aa1-91c8-d91180bdaa3e" width="200"/>

---

### 🎞️ Detail View
- Comprehensive details for each movie/series
- Includes images, trailer, production companies
- Recommendations for related content  
<img src="https://github.com/user-attachments/assets/c271d212-5159-4bc7-bfe7-22d1db099f61" width="200"/>

---

### 🔍 Search Functionality
- Search by title or keyword
- Results fetched from TMDb API  
<img src="https://github.com/user-attachments/assets/91244ce3-5d78-4389-ab18-c4d5f340d36c" width="200"/>

---

### 🔐 Authentication
- Email-based authentication using **Firebase Auth**  
<img src="https://github.com/user-attachments/assets/bc87b45a-5a28-4938-8d16-19ec86ec35dc" width="200"/>

---

### 7. **UI/UX Design**

* The app provides an optimized, smooth, and responsive user interface.
* Seamless scrolling and navigation for a top-notch experience.

## Installation

### Prerequisites

Ensure you have the following installed:

* **Node.js** and **npm** (or **yarn**)
* **React Native** environment set up on your machine (Android/iOS)
* **Firebase** project configured for authentication
* **TMDb API Key** (create a free account on [TMDb](https://www.themoviedb.org/))

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/aymen-Dahmoun/Flix_Flex
   cd Flix_Flex
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the Firebase project:

   * Create a Firebase project on [Firebase Console](https://console.firebase.google.com/).
   * Enable **Firebase Authentication** with email/password sign-in.
   * Add the Firebase configuration to your app (follow Firebase setup instructions).
   * Install Firebase SDK:

     ```bash
     npm install firebase
     ```

4. Set up the TMDb API:

   * Go to [TMDb API](https://www.themoviedb.org/documentation/api) and get your API key.
   * Replace the placeholder in your code with your API key.

5. Run the app:


     ```bash
     npx expo start
     ```

## Usage

1. **Sign Up/Log In**: Use Firebase email authentication to sign up or log in.
2. **Explore Movies and Series**: Browse through trending, upcoming, top-rated, and discover sections on the Movies and Series screens.
3. **Add to Favorites**: Tap the heart icon on any movie or series poster to add it to your favorites.
4. **Search**: Use the search feature to find movies or series by name or keywords.
5. **View Movie/Series Details**: Click on any movie or series to view detailed information, trailers, and related content.

## Optimizations

* The app is designed to be **highly optimized** for smooth scrolling, fast data fetching, and efficient memory usage.
* Uses **pagination** and **lazy loading** to avoid excessive data loading and to enhance user experience.
* **AsyncStorage** is used for local storage of favorites, ensuring data is saved even when the app is closed.

## UI/UX Design

* The app follows modern **Material Design** principles for an intuitive and responsive layout.
* Seamless transitions and smooth animations provide a fluid user experience.
* Optimized for both **phones** and **tablets**.

