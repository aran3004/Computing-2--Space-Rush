# Computing 2 Submission Proforma

**CID:** [01769144]

For each section, write a maximum of 200 words.

## Brief
I used this project as a way for me to get to grips with how one would create a game on a webapp. The game itself tests ones reaction time and hand eye coordiantion as they have to keep track of objects on the screen.
A game seemed suitable since most members of my family play games and I found it insightful to get there inputs and impliment them straight away.

## Coding
Through research, it was clear that cnavas would be best for the type of game my family members were after. Even though the game is based on the use of objects, I have created functions that use their properties. The game mainly makes use of input from keys and arrays to remove and create new objects. I have also implemented asyncronous code in the form of retrieveing data from a database through a local server.

## UX/UI
In order to understand how to play the game, there is an instruction page, and there is the option for the user to return to the home page at any point using the button in the top right. The colours have been carefullt chose so that contrast is not an issue. I have also implemented sounds and text pop ups to signal when someone needs to reload for example.

## Data
Everytime the user crashes, the game ends and the score along with their name are sent to the server adn then to the database. If the client leaves the game and opens the leaderboard, it will request the name and score pairs and display the top few scores.

## Debugging
I have carried out a lot of my debugging using the web debugger on firefox, since this helped to establish when i was not calling object properties properly for example. However, I found that on some of my initial runs, that the framerate was very choppy. I created my own framerate test using .performance.now() between each of the objects being added. I found that the shadow blur addition made the game very slow. Apart from that, I used console.log() a lot to see where functions were not working as intended.

## Best Practice
1. Functions and variables have easy to understand names
2. Work flow is easy to follow with seperate files for HTML, CSS and Javascript.
3. Follows outlines of JSLint (before it was throwing errors with "this" keyword and line length).
4. Use of arrays and functions to make creating and storing objects cleaner.
5. Makes use of aria labels so accessible to all.
