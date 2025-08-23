![Screenshot_20250823_171312_Expo Go](https://github.com/user-attachments/assets/1f99cd7f-8940-4d76-bd74-bf10fe43069f)
**FlixFlex** is a mobile application built with **React Native (Expo)** that allows users to explore and discover movies and series from **The Movie Database (TMDb)**. It features smooth navigation, beautiful UI with animations, and essential features like authentication, a recommendation system bsed in user prefared genres ,favorites, and search.

---

## 🚀 Tech Stack

<p align="left">
  <img src="https://cdn.worldvectorlogo.com/logos/react-native-1.svg" alt="React Native" width="50" height="50"/>
  <img src="https://seeklogo.com/images/E/expo-logo-01BB2BCFC3-seeklogo.com.png" alt="Expo" width="50" height="50"/>
  <img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" alt="Node.js" width="50" height="50"/>
  <img src="https://cdn.worldvectorlogo.com/logos/firebase-1.svg" alt="Firebase" width="50" height="50"/>
  <img src="https://cdn.worldvectorlogo.com/logos/react-query.svg" alt="React Query" width="50" height="50"/>
</p>

---

## 🚀 Features

### 📽️ Movies Screen
- Trending movies
- Upcoming movies
- Top 5 rated movies
- Discover section with various categories  
<img src="https://github.com/user-attachments/assets/23386902-7b6c-4c8e-b117-8376af1f6a5f" width="200"/>
<img src="https://github.com/user-attachments/assets/06ca9673-ed82-4647-ab46-422027c28fca" width="200"/>

---

### 📺 Series Screen
- Trending series
- Upcoming series for the week
- Top 5 rated series
- Discover section with category filters  
<img src="https://github.com/user-attachments/assets/f1faadf6-9ece-41b6-bbac-0b6d7fe6700d" width="200"/>
<img src="https://github.com/user-attachments/assets/970147ce-bb2f-4221-ba22-d0b724e6156a" width="200"/>

---

### ❤️ Favorites
- Tap the heart icon to save movies/series
- Favorites saved locally with `AsyncStorage`  
<img src="https://github.com/user-attachments/assets/e4c1cb82-0588-472e-b845-d77210d398d0" width="200"/>

---

### 🎞️ Detail View
- Comprehensive details for each movie/series
- Includes images, trailer, production companies
- Recommendations for related content  
<img src="https://github.com/user-attachments/assets/6b6733cc-20ae-4003-9a9e-1b96b6a7a8e1" width="200"/>

---

### 🔍 Search Functionality
- Search by title or keyword
- Results fetched from TMDb API  
<img src="https://github.com/user-attachments/assets/9f1ae211-423b-41bb-928c-f9ee1b65c8dc" width="200"/>


### 🔐 Authentication
- Email-based authentication using **Firebase Auth**
- Taking favourite genres from user at signup
- using those genres for generating better content on profile screen
<img src="https://github.com/user-attachments/assets/bc87b45a-5a28-4938-8d16-19ec86ec35dc" width="200"/>
<img src="https://github.com/user-attachments/assets/5afddc27-3754-4bb9-b7b1-73c78c6ae40a" width="200"/>
<img src="https://github.com/user-attachments/assets/1d7cd80e-a87c-454b-a115-4088346673c1" width="200"/>

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

4. Set up the TMDb API:

   * Go to [TMDb API](https://www.themoviedb.org/documentation/api) and get your API key.
   * Replace the placeholder in your code with your API key.

5. rename .env.example as .env and fill the proper env variables

6. Run the app:

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

