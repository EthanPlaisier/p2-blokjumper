const dino = document.querySelector('.dino');
        const obstacle = document.querySelector('.obstacle');
        const scoreDisplay = document.querySelector('.score');
        const gameoverDisplay = document.querySelector('.gameover');
        const startBtn = document.querySelector('.start-btn');
        let score = 0;
        let speed = 5;
        let gameRunning = false;

        document.addEventListener('keydown', jump);
        startBtn.addEventListener('click', startGame);

        function startGame() {
            if (!gameRunning) {
                gameRunning = true;
                gameoverDisplay.style.display = 'none';
                startBtn.style.display = 'none';
                resetGame();
                animateGame();
            }
        }

        function jump(event) {
            if (event.code === 'Space' && dino.style.transform !== 'translateY(-100px)') {
                dino.style.transform = 'translateY(-100px)';
                setTimeout(() => {
                    dino.style.transform = 'translateY(0)';
                }, 300);
            }
        }

        function checkCollision() {
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

        function endGame() {
            gameRunning = false;
            gameoverDisplay.style.display = 'block';
            startBtn.style.display = 'block';
            document.querySelector('.final-score').textContent = score;
            resetGame();
        }

        function resetGame() {
            score = 0;
            speed = 5;
            updateScore();
            obstacle.style.animationDuration = '1s';
            obstacle.style.animationTimingFunction = 'linear';
            obstacle.style.animation = 'none';
            dino.style.transform = 'translateY(0)';
        }

        function updateScore() {
            scoreDisplay.textContent = 'Score: ' + score;
        }

        function increaseSpeed() {
            if (score % 100 === 0 && score !== 0) {
                speed += 1;
                obstacle.style.animationDuration = (1 / speed) + 's';
            }
        }

        function animateGame() {
            let obstaclePosition = window.innerWidth;
        
            function moveObstacle() {
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
        