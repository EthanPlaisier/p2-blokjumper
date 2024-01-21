const dino = document.querySelector('.dino');
        const obstacle = document.querySelector('.obstacle');
        const scoreDisplay = document.querySelector('.score');
        const gameoverDisplay = document.querySelector('.gameover');
        const startBtn = document.querySelector('.start-btn');
        let score = 0;
        let speed = 5;
        let gameRunning = false; // Het game gaat niet runnen tot dat je op start drukt //

        document.addEventListener('keydown', jump);
        startBtn.addEventListener('click', startGame);

        function startGame() { // Zorgt ervoor dat het gamerunning systeem werkt en geactiveerd word //
            if (!gameRunning) {
                gameRunning = true;
                gameoverDisplay.style.display = 'none';
                startBtn.style.display = 'none';
                resetGame();
                animateGame();
            }
        }

        function jump(event) { // Om te springen word het blok gewoon een stuk omhoog geduwd en je heb dan een cooldown om te zorgen dat je het niet kan spammen. //
            if (event.code === 'Space' && dino.style.transform !== 'translateY(-100px)') {
                dino.style.transform = 'translateY(-100px)';
                setTimeout(() => {
                    dino.style.transform = 'translateY(0)';
                }, 300);
            }
        }

        function checkCollision() { // Dit is zodat het blok een bots systeem heeft en als het hek aangeraakt word dan eindigt het spel //
            const dinoRect = dino.getBoundingClientRect();
            const obstacleRect = obstacle.getBoundingClientRect();

            if (
                dinoRect.bottom >= obstacleRect.top &&
                dinoRect.top <= obstacleRect.bottom &&
                dinoRect.right >= obstacleRect.left &&
                dinoRect.left <= obstacleRect.right
            ) {
                endGame();
            }
        }

        function endGame() { // stopt het runnen van het game zodat het niet verder gaat //
            gameRunning = false;
            gameoverDisplay.style.display = 'block';
            startBtn.style.display = 'block';
            document.querySelector('.final-score').textContent = score;
            resetGame();
        }

        function resetGame() { // Game en score word gereset, snelheid ook. //
            score = 0;
            speed = 5;
            updateScore();
            obstacle.style.animationDuration = '1s';
            obstacle.style.animationTimingFunction = 'linear';
            obstacle.style.animation = 'none';
            dino.style.transform = 'translateY(0)';
        }

        function updateScore() { // Zodat het score omhoog gaat als je speelt //
            scoreDisplay.textContent = 'Score: ' + score;
        }

        function increaseSpeed() { // Het snelheid verhoogt hoe langer je leeft, het kan moeilijker gemaakt worden of makkelijker. //
            if (score % 100 === 0 && score !== 0) {
                speed += 1;
                obstacle.style.animationDuration = (1 / speed) + 's';
            }
        }

        function animateGame() { // Animatie van het game, zorgt dat het hek naar je toe komt. //
            let obstaclePosition = window.innerWidth;
        
            function moveObstacle() { // Zorgt ervoor dat het obstakel naar links echt beweegt, ik wist zelf niet precies 100% hoe het werkte. //
                if (gameRunning) {
                    checkCollision();
                    increaseSpeed();
                    score += 1;
                    updateScore();
        
                    obstaclePosition -= speed;
                    obstacle.style.left = obstaclePosition + 'px';
        
                    if (obstaclePosition < 0) {
                        obstaclePosition = window.innerWidth;
                    }
        
                    requestAnimationFrame(moveObstacle);
                }
            }
        
            moveObstacle();
        }
        