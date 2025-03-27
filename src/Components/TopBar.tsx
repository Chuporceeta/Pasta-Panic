import {Devvit, StateSetter} from "@devvit/public-api";
import {SpeedrunTimer} from "./SpeedrunTimer.js";
import {Controller} from "../Controller.js";

interface TopBarProps {
    setPage: StateSetter<string>,
}

export const TopBar = (props: TopBarProps): JSX.Element => {
    return (
        <vstack alignment='center top' width='100%' height='55px'>
            <spacer height='3px'/>
            <hstack alignment='center middle' width='100%'>
                <button height='30px'
                        onPress={() => {Controller.instance.ordersVisible=!Controller.instance.ordersVisible}}
                >Orders</button>
                <spacer width='15%'/>
                <SpeedrunTimer/>
                <spacer width='15%'/>
                <button height='30px' onPress={() => {
                    Controller.reset();
                    props.setPage('menu');
                }}> Quit </button>
            </hstack>
        </vstack>
    );
}