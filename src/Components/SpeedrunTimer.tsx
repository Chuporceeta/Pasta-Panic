import { useInterval, useState, Devvit, } from "@devvit/public-api";

let totalcentiseconds = 0;

function startSpeedrun(millis: number, setTime: (time: string) => void) {
  useInterval(() => {
    totalcentiseconds++;
    setTime(getSpeedrunTime());
  }, millis);
}

function getSpeedrunTime() {
  let centiseconds = totalcentiseconds % 100;
  let seconds = Math.floor(totalcentiseconds/100) % 60;
  let minutes = Math.floor(totalcentiseconds/6000);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
}

export const SpeedrunTimer = () => {
  const [time, setTime] = useState(getSpeedrunTime());

  startSpeedrun(10, setTime);

  // IDK HOW TO RETURN THE TIME
  return (
    <zstack>
      <text>{time}</text>
    </zstack>
  );
};