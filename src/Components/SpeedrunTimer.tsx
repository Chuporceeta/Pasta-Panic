import { useInterval, Devvit, } from "@devvit/public-api";
import {Controller} from "../Controller.js";


export const SpeedrunTimer = (): JSX.Element => {
  useInterval(() => {
    Controller.instance.timeElapsed++;
    for (let burner of Controller.instance.burners)
      if (burner.ingredient)
        burner.cookTime++;
  }, 1000).start();

  const seconds = String(Controller.instance.timeElapsed % 60).padStart(2, '0');
  const minutes = String(Math.floor(Controller.instance.timeElapsed / 60)).padStart(2, '0');

  return (
    <zstack
        backgroundColor='rgb(20, 20, 20, 0.85)'
        cornerRadius='small'
        width='55px' height='30px'
        alignment='center middle'
    >
      <text style='heading' color='green' size='xlarge' selectable={false}>{`${minutes}:${seconds}`}</text>
    </zstack>
  );
};