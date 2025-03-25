import {Context, Devvit, useForm, useState} from "@devvit/public-api";

import {AssemblyStationScreen} from "../Components/AssemblyStationScreen.js";
import {KitchenScreen} from "../Components/KitchenScreen.js";
import {CounterScreen} from "../Components/CounterScreen.js";
import {TutorialScreen} from "../Components/TutorialScreen.js";
import {OrderScreen} from "../Components/OrderScreen.js";
import {ScreenSwitcher} from "../Components/ScreenSwitcher.js";
import {Controller} from "../Controller.js";
import {Order} from "../types.js";

interface PinnedPostProps {
    coins: number,
    myOrder: Order | null,
    avatarURL: string,
}

export const PinnedPost = (props: PinnedPostProps, context: Context): JSX.Element => {
    const [page, setPage] = useState('menu');

    const newGameForm = useForm(
        {
            title: 'New Game',
            description: "Select Difficulty",
            acceptLabel: 'Start',
            fields: [
                {
                    type: 'select',
                    name: 'difficulty',
                    label: 'Difficulty',
                    required: true,
                    multiSelect: false,
                    defaultValue: ['easy'],
                    options: [
                        {label: 'Easy', value: 'easy'},
                        {label: 'Medium', value: 'medium'},
                        {label: 'Hard', value: 'hard'},
                    ]
                },
            ],
        },
        (values) => {
            Controller.instance.difficulty = values.difficulty[0];
            setPage('counter');
        }
    );

    function startRun() {
        context.ui.showForm(newGameForm);
    }

    const Menu = (
        <zstack height="100%" width="100%">
            <image
                url="Backgrounds/MainMenu.png"
                description="menu-background"
                imageHeight={512}
                imageWidth={718}
                height="100%"
                width="100%"
                resizeMode="cover"
            />
            <vstack height="100%" width="100%" gap="medium" alignment="center middle">
                <spacer grow/>
                <button appearance="primary" onPress={startRun}>
                    Play
                </button>
                <button appearance="primary" onPress={() => setPage('tutorial')}>
                    Tutorial
                </button>
                <button appearance="primary" onPress={() => setPage('order')}>
                    Order Food
                </button>
                <spacer height="10%"/>
            </vstack>
        </zstack>
    );

    const switcher = <ScreenSwitcher setPage={setPage} />

    const pages: Record<string, JSX.Element> = {
        menu: Menu,
        counter: <CounterScreen switcher={switcher}/>,
        kitchen: <KitchenScreen switcher={switcher}/>,
        assembly: <AssemblyStationScreen switcher={switcher}/>,
        tutorial: <TutorialScreen/>,
        order: <OrderScreen myOrder={props.myOrder} coins={props.coins} avatarURL={props.avatarURL}/>,
    };

    return pages[page] || Menu;
};