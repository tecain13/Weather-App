# Weather Dashboard
​
## Overview
​
The purpose of this application is to provide the user with a user-friendly weather forecast application. The application populates with information about the current day's weather in a select city/location, as well as an upcoming 5-day forecast. The application also retains a list of previously-searched cities for easy navigation
​
### Links
​https://github.com/tecain13/Weather-App

https://tecain13.github.io/Weather-App/
​
### Problem
​
Currently, there are a lot of weather apps that provide more information than necessary, or don't retain information about the weather in cities you've previously searched.
​
### Solution
​
This application provides a quick glimpse into a city's current and near-future conditions by harnessing the information within the OpenWeather API in both a desktop and mobile-friendly environment. 
​
## Tech and Features Used
​
* Bootstrap
* Javascript
* JQuery
* OpenWeather API
​
## How to use
​
A user can search any city name in the search bar and press the search/magnifying glass button. The API retrieving information in the background will supply results for both the current day's weather and the 5-day forecast. The readings include information about humidity, temperature, and weather (e.g. rain, sun, partly cloudy, etc).
​
## Technical Overview
​
1. The search button retains the value of the user searchterm/searched city utilizing local storage
2. Previously-searched cities are saved in a sidebar list
2. Simultaneously, that city name is passed on to the OpenWeather API to retrieve forecast information
3. The retrieved information is sent back and appended to the DOM in both a div for the current day's weather and in bootstrap-enabled cards for the upcoming 5-day forecast
4. Specific attributes within the retrieved API object are displayed within the html elements on the DOM
​
