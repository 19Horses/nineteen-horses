import { ReactP5Wrapper } from '@p5-wrapper/react';
import { attractOrRepel } from './attractOrRepel';
import { erase } from './erase';
import { floatingAround } from './floatingAround';

const possibleSketches = [floatingAround];

const App = () => {
  const sketch =
    possibleSketches[Math.floor(Math.random() * possibleSketches.length)];
  return (
    <>
      <div
        id="form-wrapper"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: innerWidth,
          height: innerHeight,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'none',
        }}
      >
        <form
          id="idea-form"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: 'transparent',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="e.g. Eli Campbell"
          ></input>
          <label htmlFor="name">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="e.g. 19horses@gmail.com"
          ></input>
          <label htmlFor="idea">Website idea:</label>
          <input
            id="idea"
            type="text"
            name="idea"
            placeholder="A lovely website!"
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
      <ReactP5Wrapper sketch={sketch} />
    </>
  );
};

export default App;
