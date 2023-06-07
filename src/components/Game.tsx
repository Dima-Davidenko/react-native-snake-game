import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Colors } from '../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Coordinate, Direction, GestureEventType } from '../types/types';
import Snake from './Snake';

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function Game(): JSX.Element {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGamePaused, setIsGamePaused] = useState<boolean>(false);

  useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isGamePaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isGamePaused]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead };
    //  game over check
    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    setSnake([newHead, ...snake.slice(0, -1)]);
  };

  const handleGesture = (e: GestureEventType) => {
    const { translationX, translationY } = e.nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      // horizontal moving
      if (translationX > 0) {
        // moving right
        setDirection(Direction.Right);
      } else {
        // moving left
        setDirection(Direction.Left);
      }
    } else {
      // vertical moving
      if (translationY > 0) {
        // moving down
        setDirection(Direction.Down);
      } else {
        // moving up
        setDirection(Direction.Up);
      }
    }
    return;
  };
  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boundaries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.background,
  },
});
