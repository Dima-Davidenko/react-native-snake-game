import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Coordinate } from '../types/types';
import { Colors } from '../styles/colors';

interface SnakeProps {
  snake: Coordinate[];
}

export default function Snake({ snake }: SnakeProps): JSX.Element {
  return (
    <>
      {snake.map((segment, i) => {
        const segmentStyle = {
          left: segment.x * 10,
          top: segment.y * 10,
        };
        return <View key={i} style={[styles.snake, segmentStyle]} />;
      })}
    </>
  );
}

const styles = StyleSheet.create({
  snake: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    position: 'absolute',
  },
});
