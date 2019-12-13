SIMON

Description:

A game where the computer does a series of colors is a random but recorded order and then the player tries to copy that same order.

Requirements:

- The number of colors in the sequence must increase by one each round
- The player must pick the same colors in the sequence or else they lose
- A score must be kept track of
- The player should be able to reset the game at any time
- The player should be able to replay the game after losing with a different random sequence

Basic Plan: 

- Create HTML with all divs and ids/classes
- Create CSS with basic styling to tell the different elements apart
- Creat script that:
    - Changes color of div when clicked, then back to default
    - Displays computer sequence fits, then asks the player to copy it
    - Records computer plays and copies the previous moves when incrementing through the same sequence
    - Tests if player input is correct
    - Keeps track of player score
    - Keeps a high-score for the player that doesn't go away when restarted

Silver Plan:

- Remove placeholder css and move divs around to the correct spot
- Add basic animations for when buttons are clicked to make them look like buttons

Gold Plan:

- Make everything look like a real Simon game (shapes and orientation)