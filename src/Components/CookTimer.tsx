import { Devvit } from "@devvit/public-api";
import {Controller} from "../Controller.js";

interface CookTimerProps {
    index: number
}

export const CookTimer = (props: CookTimerProps): JSX.Element => {
    const time = Controller.instance.burners[props.index].cookTime;
    const col = 'black';
    return (
        <vstack width='134px' alignment='center middle'>
            <vstack width='30px' backgroundColor='#696969' alignment='center middle' cornerRadius='small' borderColor='black'>
                <text selectable={false} color={col} style='heading'>
                    {time}
                </text>
            </vstack>
        </vstack>
    );
};