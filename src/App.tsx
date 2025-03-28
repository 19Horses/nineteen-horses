import { ReactP5Wrapper } from '@p5-wrapper/react';
import p5 from 'p5';
import { memo, useCallback, useMemo, useState } from 'react';
import { ClientDetails } from './components/ClientDetails';
import { randomHorses } from './sketch';

const MemoizedP5Wrapper = memo(ReactP5Wrapper);

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const formWidth = useMemo(
    () => (innerWidth < 750 ? innerWidth * 0.8 : innerWidth * 0.25),
    [innerWidth]
  );

  const sketch = useCallback(
    (p5: p5) => randomHorses(p5, () => setIsReady(true), formWidth),
    []
  );

  return (
    <>
      {isReady && <ClientDetails formWidth={formWidth} />}
      <MemoizedP5Wrapper sketch={sketch} />
    </>
  );
};

export default App;
