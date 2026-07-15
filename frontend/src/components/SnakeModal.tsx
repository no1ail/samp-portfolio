import { useEffect, useRef, useState } from "react";

interface SnakeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SnakeModal({ isOpen, onClose }: SnakeModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Snake Game State Ref to avoid stale closures in setTimeout
  const gameState = useRef({
    snake: [] as { x: number; y: number }[],
    dx: 10,
    dy: 0,
    foodX: 0,
    foodY: 0,
    timer: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("snake_high_score");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    if (!isOpen && gameState.current.timer) {
      clearTimeout(gameState.current.timer);
      setGameStarted(false);
    }
  }, [isOpen]);

  const initGame = () => {
    gameState.current.snake = [
      { x: 150, y: 150 },
      { x: 140, y: 150 },
      { x: 130, y: 150 },
      { x: 120, y: 150 },
      { x: 110, y: 150 },
    ];
    setScore(0);
    setIsGameOver(false);
    gameState.current.dx = 10;
    gameState.current.dy = 0;
    createFood();
  };

  const randomTen = (min: number, max: number) => {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
  };

  const createFood = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let newFoodX = randomTen(0, canvas.width - 10);
    let newFoodY = randomTen(0, canvas.height - 10);

    let isOnSnake = false;
    gameState.current.snake.forEach((part) => {
      if (part.x === newFoodX && part.y === newFoodY) isOnSnake = true;
    });

    if (isOnSnake) {
      createFood();
    } else {
      gameState.current.foodX = newFoodX;
      gameState.current.foodY = newFoodY;
    }
  };

  const clearCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--color-canvas") || "#111";
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--color-border") || "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  };

  const drawSnakePart = (ctx: CanvasRenderingContext2D, part: { x: number; y: number }) => {
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--color-brand") || "lightgreen";
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(part.x, part.y, 10, 10);
    ctx.strokeRect(part.x, part.y, 10, 10);
  };

  const drawFood = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "darkred";
    ctx.fillRect(gameState.current.foodX, gameState.current.foodY, 10, 10);
    ctx.strokeRect(gameState.current.foodX, gameState.current.foodY, 10, 10);
  };

  const advanceSnake = () => {
    const head = {
      x: gameState.current.snake[0].x + gameState.current.dx,
      y: gameState.current.snake[0].y + gameState.current.dy,
    };
    gameState.current.snake.unshift(head);

    const didEatFood =
      gameState.current.snake[0].x === gameState.current.foodX &&
      gameState.current.snake[0].y === gameState.current.foodY;

    if (didEatFood) {
      setScore((s) => s + 10);
      createFood();
    } else {
      gameState.current.snake.pop();
    }
  };

  const didGameEnd = (canvas: HTMLCanvasElement) => {
    const snake = gameState.current.snake;
    for (let i = 4; i < snake.length; i++) {
      const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
      if (didCollide) return true;
    }
    const hitLeft = snake[0].x < 0;
    const hitRight = snake[0].x >= canvas.width;
    const hitTop = snake[0].y < 0;
    const hitBottom = snake[0].y >= canvas.height;

    return hitLeft || hitRight || hitTop || hitBottom;
  };

  const mainTick = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (didGameEnd(canvas)) {
      setScore((currentScore) => {
        setHighScore((currentHigh) => {
          if (currentScore > currentHigh) {
            localStorage.setItem("snake_high_score", currentScore.toString());
            return currentScore;
          }
          return currentHigh;
        });
        return currentScore;
      });
      setGameStarted(false);
      setIsGameOver(true);
      return;
    }

    gameState.current.timer = window.setTimeout(() => {
      clearCanvas(ctx, canvas);
      drawFood(ctx);
      advanceSnake();
      gameState.current.snake.forEach((part) => drawSnakePart(ctx, part));
      mainTick();
    }, 100);
  };

  const startGame = () => {
    if (gameState.current.timer) clearTimeout(gameState.current.timer);
    setGameStarted(true);
    initGame();
    mainTick();
    if (canvasRef.current) canvasRef.current.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted) return;
      const { dx, dy } = gameState.current;
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;
      const goingLeft = dx === -10;

      if ((e.key === "ArrowLeft" || e.key === "a") && !goingRight) {
        gameState.current.dx = -10;
        gameState.current.dy = 0;
      }
      if ((e.key === "ArrowUp" || e.key === "w") && !goingDown) {
        gameState.current.dx = 0;
        gameState.current.dy = -10;
      }
      if ((e.key === "ArrowRight" || e.key === "d") && !goingLeft) {
        gameState.current.dx = 10;
        gameState.current.dy = 0;
      }
      if ((e.key === "ArrowDown" || e.key === "s") && !goingUp) {
        gameState.current.dx = 0;
        gameState.current.dy = 10;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted]);

  const triggerDirection = (dir: string) => {
    if (!gameStarted) return;
    const { dx, dy } = gameState.current;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (dir === "LEFT" && !goingRight) { gameState.current.dx = -10; gameState.current.dy = 0; }
    if (dir === "UP" && !goingDown) { gameState.current.dx = 0; gameState.current.dy = -10; }
    if (dir === "RIGHT" && !goingLeft) { gameState.current.dx = 10; gameState.current.dy = 0; }
    if (dir === "DOWN" && !goingUp) { gameState.current.dx = 0; gameState.current.dy = 10; }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active">
      <div className="modal-content glass-card" style={{ maxWidth: "400px", textAlign: "center" }}>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <h3>Snake Game</h3>
        <div className="snake-score">
          Score: <span>{score}</span> | High Score: <span>{highScore}</span>
        </div>
        <canvas
          ref={canvasRef}
          width="300"
          height="300"
          tabIndex={0}
          style={{
            background: "var(--color-canvas)",
            border: "2px solid var(--color-border)",
            borderRadius: "10px",
            margin: "1rem auto",
            display: "block",
            outline: "none"
          }}
        ></canvas>

        <div className="mobile-controls">
          <button className="dpad-btn" onClick={() => triggerDirection("UP")}>
            <i className="fas fa-arrow-up"></i>
          </button>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
            <button className="dpad-btn" onClick={() => triggerDirection("LEFT")}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <button className="dpad-btn" onClick={() => triggerDirection("RIGHT")}>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <button className="dpad-btn" onClick={() => triggerDirection("DOWN")}>
            <i className="fas fa-arrow-down"></i>
          </button>
        </div>
        {!gameStarted && (
          <button className="btn" style={{ width: "100%", marginTop: "1rem" }} onClick={startGame}>
            {isGameOver ? "Game Over - Play Again" : "Start Game"}
          </button>
        )}
      </div>
    </div>
  );
}
