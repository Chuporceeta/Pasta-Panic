import {Context, Devvit, useState} from "@devvit/public-api";
import {AssemblyStationScreen} from "../Components/AssemblyStationScreen.js";
import {KitchenScreen} from "../Components/KitchenScreen.js";
import {CounterScreen} from "../Components/CounterScreen.js";
import {TutorialScreen} from "../Components/TutorialScreen.js";
import {ScreenSwitcher} from "../Components/ScreenSwitcher.js";
import {Controller} from "../Controller.js";
import {Order} from "../types.js";
import {TopBar} from "../Components/TopBar.js";
import {SharedRunCompleteScreen} from "../Components/SharedRunCompleteScreen.js";

interface SharedPostProps {
    coins: number,
    myOrder: Order | null,
    avatarURL: string,
    username: string,
    orders: [Order, string, boolean][],
    difficulty: string,
}

export const SharedPost = (props: SharedPostProps, context: Context): JSX.Element => {
    const [page, setPage] = useState('menu');

    async function startRun() {
        // @ts-ignore
        Controller.instance.difficulty = props.difficulty;
        Controller.instance.length = props.orders.length;
        Controller.instance.orders = props.orders;

        Controller.instance.openOrders = [...Array(props.orders.length).keys()];
        for (let i = 0; i < (props.difficulty == 'easy' ? 1 : props.difficulty == 'medium' ? 2 : 3); i++)
            Controller.instance.activeOrders.push([Controller.instance.openOrders.shift() ?? -1, false]);
        setPage('counter');
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
                    How To Play
                </button>
                <spacer height="15%"/>
            </vstack>
        </zstack>
    );

    const switcher = <ScreenSwitcher setPage={setPage} />
    const topBar = <TopBar setPage={setPage}/>;
    Controller.instance.setPage = setPage;

    const pages: Record<string, JSX.Element> = {
        menu: Menu,
        counter: <CounterScreen switcher={switcher} topBar={topBar}/>,
        kitchen: <KitchenScreen switcher={switcher} topBar={topBar}/>,
        assembly: <AssemblyStationScreen switcher={switcher} topBar={topBar}/>,
        complete: <SharedRunCompleteScreen myOrder={props.myOrder} coins={props.coins} avatarURL={props.avatarURL}
                                           username={props.username} setPage={setPage}/>,
        tutorial: <TutorialScreen setPage={setPage}/>,
    };

    return pages[page] || Menu;
};