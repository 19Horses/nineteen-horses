import p5 from 'p5';
import monoRegular from './fonts/mono.ttf';
import { horseImages } from './horses';
import { Horse } from './Horse';

export const randomHorses = (p5: p5, setIsReady: () => void) => {
  let font: p5.Font;
  const horses: Horse[] = [];

  p5.preload = () => {
    font = p5.loadFont(monoRegular);
    p5.shuffle(horseImages).forEach((src: string, i) => {
      horses.push(new Horse(src, p5, i));
    });
  };

  p5.setup = () => {
    p5.imageMode(p5.CENTER);
    p5.rectMode(p5.CENTER);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textFont(font);
    p5.createCanvas(innerWidth, innerHeight);
    horses.forEach((horse, i) => {
      const existingHorses = horses.slice(0, i);
      horse.updateSize();
      horse.updatePosition(existingHorses);
    });
  };

  p5.windowResized = () => {
    p5.resizeCanvas(innerWidth, innerHeight);
    horses.forEach((horse, i) => {
      const existingHorses = horses.slice(0, i);
      horse.updatePosition(existingHorses);
    });
    p5.clear();
  };

  p5.draw = () => {
    horses.forEach((horse) => {
      horse.draw();
    });

    const doneHorses = horses.filter((h) => h.isDone);
    if (doneHorses.length === horses.length) {
      setIsReady();
    }
  };
};
