import {Context, Devvit} from "@devvit/public-api";
import {Controller} from "../Controller.js";

interface RunCompleteScreenProps {

}

export const RunCompleteScreen = (props: RunCompleteScreenProps, context: Context): JSX.Element => {
    const seconds = String(Controller.instance.timeElapsed % 60).padStart(2, '0');
    const minutes = String(Math.floor(Controller.instance.timeElapsed / 60)).padStart(2, '0');

    return (
        <zstack width='100%' height='100%'>
            <vstack alignment='center middle'>
                <text>Run Complete!</text>
                <text>Time: {minutes}:{seconds}</text>
                <text>Coins earned: {Controller.instance.earnings}</text>
                <text>Challenge others to beat your time?</text>
                <button>Share Run</button>
            </vstack>
        </zstack>
    )
}