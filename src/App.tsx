import { ReactP5Wrapper } from '@p5-wrapper/react';
import { attractOrRepel } from './attractOrRepel';
import { erase } from './erase';
import { floatingAround } from './floatingAround';

const possibleSketches = [floatingAround];

const App = () => {
  const sketch =
    possibleSketches[Math.floor(Math.random() * possibleSketches.length)];
  return <ReactP5Wrapper sketch={sketch} />;
};

export default App;
