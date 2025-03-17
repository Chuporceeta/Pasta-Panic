import {Context, Devvit, StateSetter} from "@devvit/public-api";

interface ScreenSwitcherProps {
    setPage: StateSetter<string>,
}

export const ScreenSwitcher = (props: ScreenSwitcherProps, context: Context): JSX.Element => {
    return (
        <zstack alignment='center' width='105%' border='thick' borderColor='white' backgroundColor='brown'>
            <hstack alignment='center middle' height='30px' width='80%' maxWidth='512px'>
                <text selectable={false} style='heading' onPress={() => props.setPage('counter')}>Counter</text>
                <spacer grow/>
                <text selectable={false} style='heading' onPress={() => props.setPage('kitchen')}>Kitchen</text>
                <spacer grow/>
                <text selectable={false} style='heading' onPress={() => props.setPage('assembly')}>Assembly</text>
            </hstack>
        </zstack>
    );
};