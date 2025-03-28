import { ReactP5Wrapper } from '@p5-wrapper/react';
import p5 from 'p5';
import { memo, useCallback, useState } from 'react';
import { ClientDetails } from './components/ClientDetails';
import { randomHorses } from './sketch';

const MemoizedP5Wrapper = memo(ReactP5Wrapper);

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const sketch = useCallback(
    (p5: p5) => randomHorses(p5, () => setIsReady(true)),
    []
  );

  return (
    <>
      {isReady && <ClientDetails />}
      <MemoizedP5Wrapper sketch={sketch} />
    </>
  );
};

export default App;
