import { ReactP5Wrapper } from '@p5-wrapper/react';
import { attractOrRepel } from './attractOrRepel';
import { erase } from './erase';

const possibleSketches = [attractOrRepel, erase];

const App = () => {
  const sketch =
    possibleSketches[Math.floor(Math.random() * possibleSketches.length)];
  return <ReactP5Wrapper sketch={sketch} />;
};

export default App;
