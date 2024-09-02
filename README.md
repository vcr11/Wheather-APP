# Weather App

This is a Weather App built with React.js that allows users to search for and display current weather conditions, including a 5-day forecast, for any city in the world. The app fetches data from the OpenWeather API.

## Demo

Check out the live demo of the app here: [Weather App Demo](https://vcr11.github.io/Wheather-APP/)

## Features

- **City Search**: Users can search for weather conditions of any city in the world.
- **Real-Time Weather Data**: The app displays the current weather conditions, including temperature, weather description, humidity, and more.
- **5-Day Forecast**: The app provides a detailed 5-day weather forecast, including temperature and weather conditions for each day.
- **Responsive Design**: The app is designed to be responsive and works on both desktop and mobile devices.

## Technologies & Tools Used

- **React.js**: A JavaScript library for building user interfaces.
- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Visual Studio Code**: The code editor used for this project.
- **OpenWeather API**: The API used to fetch weather data.

## Installation and Usage

To run this project locally on your machine, follow these steps:

### 1. Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/vcr11/Wheather-APP.git
```

### 2. Navigate to the Project Directory

Move into the project directory:

```bash
cd Wheather-APP
```

### 3. Install Dependencies

Before running the app, you need to install the necessary dependencies. Make sure you have [Node.js](https://nodejs.org/) installed, then run:

```bash
npm install
```

### 4. Obtain an API Key from OpenWeather

You need an API key from OpenWeather to fetch weather data. If you don't have one, you can sign up for a free account and obtain your API key [here](https://home.openweathermap.org/users/sign_up).

### 5. Set Up Your API Key

Create a `.env` file in the root of your project directory and add your OpenWeather API key like this:

```bash
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
```

### 6. Run the Development Server

Start the development server to view the app in your browser:

```bash
npm start
```

This will automatically open your default browser and navigate to `http://localhost:3000`, where you can see the Weather App in action.

### 7. Deploying to GitHub Pages

If you want to deploy the app to GitHub Pages, follow these steps:

1. Install the `gh-pages` package:

   ```bash
   npm install gh-pages --save-dev
   ```

2. Update your `package.json` file with the following additions:

   ```json
   "homepage": "https://vcr11.github.io/Wheather-APP",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Deploy the app by running:

   ```bash
   npm run deploy
   ```

The app will be deployed to `https://vcr11.github.io/Wheather-APP`.

## Usage

- **Search for a City**: Enter the name of the city you want to check the weather for in the search bar and press **Enter**.
- The app will display the current weather conditions for the searched city, including temperature, weather description, and a 5-day weather forecast.

## Contact

If you have any questions or suggestions, feel free to contact me:

- **GitHub**: [vcr11](https://github.com/vcr11)

