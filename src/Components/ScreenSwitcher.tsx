import {Context, Devvit, StateSetter} from "@devvit/public-api";

interface ScreenSwitcherProps {
    setPage: StateSetter<string>,
}

export const ScreenSwitcher = (props: ScreenSwitcherProps, context: Context): JSX.Element => {
    return (
        <vstack alignment='center' width='105%' border='thick' borderColor='white' backgroundColor='black'>
            <hstack alignment='center' width='80%'>
                <button appearance='plain' onPress={() => props.setPage('counter')}>Counter</button>
                <spacer grow/>
                <button appearance='plain' onPress={() => props.setPage('kitchen')}>Kitchen</button>
                <spacer grow/>
                <button appearance='plain' onPress={() => props.setPage('assembly')}>Assembly</button>
            </hstack>
        </vstack>
    );
};