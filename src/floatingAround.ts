import p5 from 'p5';
import { asciiHorse } from './asciiHorse';
import monoRegular from './fonts/mono.ttf';
import { Character } from './charatcer';

const getBoxWidth = (screenWidth: number) => {
  if (screenWidth < 600) {
    return screenWidth - 40;
  } else if (screenWidth < 1000) {
    return 400;
  } else {
    return screenWidth / 3;
  }
};

export const floatingAround = (p5: p5) => {
  let normalizedHorse: Character[] = [];
  let font: p5.Font;

  const boxWidth = getBoxWidth(innerWidth);
  const startingPosition = {
    x: innerWidth / 2 - boxWidth / 2,
    y: innerHeight / 2 - boxWidth / 2,
  };

  p5.preload = () => {
    font = p5.loadFont(monoRegular);
  };

  let textPoints: Character[];

  p5.setup = () => {
    p5.frameRate(30);
    p5.createCanvas(innerWidth, innerHeight);
    p5.textFont(font);
    p5.fill('white');
    p5.rectMode(p5.CENTER);
    p5.textAlign(p5.CENTER, p5.CENTER);
    normalizedHorse = resetHorsePos();

    p5.textSize(20);
    textPoints = font
      .textToPoints(
        '19 Horses',
        p5.width / 2 - p5.textWidth('19 Horses') / 2,
        p5.height / 2 - boxWidth / 2 - 24,
        20,
        {
          sampleFactor: 0.6,
        }
      )
      .map((p) => {
        return new Character(
          p5.random(p5.width),
          p5.random(p5.height),
          p5.random(-1, 1),
          p5.random(-1, 1),
          p.x,
          p.y,
          '-',
          p5
        );
      });

    p5.textSize(10);
  };

  p5.windowResized = () => {
    normalizedHorse = resetHorsePos();
    p5.resizeCanvas(innerWidth, innerHeight);
  };

  p5.draw = () => {
    p5.background(0);

    const finishedChars = normalizedHorse.filter((c) => c.isInFinalPos);
    const offScreenChars = normalizedHorse.filter((c) => c.isDone);
    const renderForm = offScreenChars.length === normalizedHorse.length;

    normalizedHorse.forEach((c) => {
      if (finishedChars.length === normalizedHorse.length) {
        c.falling = true;
      }
      c.update();
      c.display();
    });
    textPoints.forEach((p) => {
      p.update();
      p.display();
    });

    // Template below
    p5.push();
    p5.noFill();
    p5.stroke('white');
    p5.circle(startingPosition.x, startingPosition.y, 20);
    p5.rect(p5.width / 2, p5.height / 2, boxWidth);
    p5.pop();
  };

  p5.mousePressed = () => {
    normalizedHorse.forEach((c) => {
      c.moveToFinalPosition();
    });

    textPoints.forEach((c) => {
      c.moveToFinalPosition();
    });
  };

  function resetHorsePos() {
    const charSize = boxWidth / asciiHorse[0].length + 1;
    const xOffset = startingPosition.x + p5.textWidth('-') / 2;
    const yOffset = startingPosition.y;
    const horse = [];
    for (let y = 0; y < asciiHorse.length; y++) {
      const asciiRow = asciiHorse[y];

      for (let x = 0; x < asciiRow.length; x++) {
        const char = asciiRow[x];
        const finalXPos = x * charSize + xOffset - x;
        const finalYPos = y * charSize + yOffset + y * 2;
        const xPos = p5.random(p5.width);
        const yPos = p5.random(p5.height);
        const xSpd = p5.random(-1, 1);
        const ySpd = p5.random(-1, 1);
        horse.push(
          new Character(xPos, yPos, xSpd, ySpd, finalXPos, finalYPos, char, p5)
        );
      }
    }
    return horse;
  }
};
