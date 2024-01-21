<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="navmenu.css">
    <link rel="stylesheet" href="game.css">
</head>
<body>

    <div class="game-container">
        <div class="dino"></div>
        <div class="obstacle"></div>
        <div class="score">Score: 0</div>
        <div class="gameover">Game Over! Your score: <span class="final-score">0</span></div>
        <button class="start-btn" onclick="startGame()">Start Game</button>
    </div>

    <script src="game.js"></script>

</body>
</html>