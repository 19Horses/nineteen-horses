import p5 from 'p5';
import monoRegular from '../fonts/mono.ttf';
import { horseImages } from './horses';
import { Horse } from './Horse';

export const randomHorses = (p5: p5, setIsReady: () => void) => {
  let font: p5.Font;
  const horses: Horse[] = [];
  let done = false;
  const fontSize = 20;

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
    p5.textSize(fontSize);
    p5.noCursor();
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
    p5.background('black');
    horses.forEach((horse) => {
      horse.draw();
    });

    const doneHorses = horses.filter((h) => h.isDone);

    p5.push();
    p5.fill('white');

    const content = `${doneHorses.length.toString()} Horses`;
    const margin = 10;

    const x = p5.width - p5.textWidth(content) / 2;
    const y = fontSize / 2;
    p5.text(content, x - margin, y + margin);
    p5.pop();

    if (doneHorses.length === horses.length) {
      setIsReady();
    }
  };
};
