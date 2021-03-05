# FIT TRACK

## Table of Content
* Application Link
* Application Description
* Technologies
* Dependencies
* Wireframes and User Stories
* Difficulties faced
* User Stories
* RESTFUL Routes
* Further improvements

## Application Link
https://terryfittrack.herokuapp.com/

## Application Description
This application alows users to create and manage their workout plans

## Technologies
* A working full-stack application using Node.js, MongoDB, Express and EJS
* Adhered to MVC file structure: Models, Views, Controllers
* Included all 7 RESTful routes and full CRUD application
* Deployed online via Heroku

## Dependencies
* Bcrypt is used to hash and store passwords
* Bootstrap is used for front-end framework containing HTML and CSS based design templates
* Dotenv is used as a zero-dependency module that loads environment variables from a .env file into process.env.
* EJS is used as the templating engine and allows generating HTML with plain javascript
* Express-session is used to store user state and every user will be assigned a unique session
* Method-override to allow us to use HTTP verbs such as PUT and DELETE in places where the client doesn't support it
* Moment.js is used as a wrapper for the native JavaScript Date object
* Mongoose is used as a schema-based solution to model the application data. It manages relationships between data, provides schema validation, and is used to translate between object in code and the representation of those objects in MongoDB

## Wireframes and User Stories
1. Mainpage

As a user, i want to know what this application is about when i access the website at a glance.
<a href="https://github.com/Terrykoek/FIT-TRACK/blob/master/Mainpage.PNG" target="_blank" ><img src="https://github.com/Terrykoek/FIT-TRACK/blob/master/Mainpage.PNG" width="90%"></a>

2. Create Account page

As a user, i want to be able to register a new account.

<a href="https://github.com/Terrykoek/FIT-TRACK/blob/master/Account%20create%20page.PNG" target="_blank" ><img src="https://github.com/Terrykoek/FIT-TRACK/blob/master/Account%20create%20page.PNG" width="90%"></a>

3. Login Page

As a user, i want to be able to login to the app.

<a href="https://github.com/Terrykoek/FIT-TRACK/blob/master/login%20page.PNG" target="_blank" ><img src="https://github.com/Terrykoek/FIT-TRACK/blob/master/login%20page.PNG" width="90%"></a>

4. Home Page

Home page to inform user of log in success.

<a href="https://github.com/Terrykoek/FIT-TRACK/blob/master/Homepage.PNG" target="_blank" ><img src="https://github.com/Terrykoek/FIT-TRACK/blob/master/Homepage.PNG" width="90%"></a>

5. Index Page

Index page where all workouts are shown.

<a href="https://github.com/Terrykoek/FIT-TRACK/blob/master/Index%20page.PNG" target="_blank" ><img src="https://github.com/Terrykoek/FIT-TRACK/blob/master/Index%20page.PNG" width="90%"></a>

6. Create new workout Page

As a user, i want to be able to create new workout.

<a href="https://github.com/Terrykoek/FIT-TRACK/blob/master/Create%20new%20workout%20page.PNG" target="_blank" ><img src="https://github.com/Terrykoek/FIT-TRACK/blob/master/Create%20new%20workout%20page.PNG" width="90%"></a>

7. First entry page

As a user, i want my workout to reflect on my index page.

<a href="https://github.com/Terrykoek/FIT-TRACK/blob/master/first%20entry%20page.PNG" target="_blank" ><img src="https://github.com/Terrykoek/FIT-TRACK/blob/master/first%20entry%20page.PNG" width="90%"></a>


8. Edit workout page

As a user, i want to be able to edit my workouts.

<a href="https://github.com/Terrykoek/FIT-TRACK/blob/master/edit%20workout%20page.PNG" target="_blank" ><img src="https://github.com/Terrykoek/FIT-TRACK/blob/master/edit%20workout%20page.PNG" width="90%"></a>

9. Show editted workout page

As a user, i want my edited workout to show on my index page.
<a href="https://github.com/Terrykoek/FIT-TRACK/blob/master/Editted%20index%20page.PNG" target="_blank" ><img src="https://github.com/Terrykoek/FIT-TRACK/blob/master/Editted%20index%20page.PNG" width="90%"></a>

10. Delete workout page

As a user, i want to be able to delete my workouts.
<a href="https://github.com/Terrykoek/FIT-TRACK/blob/master/Index%20page.PNG" target="_blank" ><img src="https://github.com/Terrykoek/FIT-TRACK/blob/master/Index%20page.PNG" width="90%"></a>



## RESTFUL Routes
1

## Further improvements
* Checkbox instead of true or false under completed column
* Using moment.js to format the date under date column
* User profile details so that user can input details like height, weight and BMI
