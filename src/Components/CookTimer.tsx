import { Devvit } from "@devvit/public-api";
import {Controller} from "../Controller.js";
import {cookIntervals} from "../data.js";

interface CookTimerProps {
    index: number
}

export const CookTimer = (props: CookTimerProps): JSX.Element => {
    const burner = Controller.instance.burners[props.index];
    const time = burner.cookTime;

    let col = '#696969';
    if (burner.ingredient) {
        const intervals = cookIntervals[burner.ingredient];
        const colors = ['orange', 'lime', 'red', 'black'];
        for (let i = 0; i < 4; i++)
            if (time >= intervals[i])
                col = colors[i];
    }

    return (
        <vstack width='134px' alignment='center middle'>
            <vstack width='30px' backgroundColor={col} alignment='center middle' cornerRadius='small' borderColor='black'>
                <text selectable={false} color='black' style='heading'>
                    {time}
                </text>
            </vstack>
        </vstack>
    );
};