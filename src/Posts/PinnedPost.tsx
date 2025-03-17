import {Context, Devvit, useState} from "@devvit/public-api";

import {AssemblyStationScreen} from "../Components/AssemblyStationScreen.js";
import {KitchenScreen} from "../Components/KitchenScreen.js";
import {CounterScreen} from "../Components/CounterScreen.js";
import {StoreScreen} from "../Components/StoreScreen.js";
import {TutorialScreen} from "../Components/TutorialScreen.js";
import {OrderScreen} from "../Components/OrderScreen.js";
import {ScreenSwitcher} from "../Components/ScreenSwitcher.js";
import {Controller} from "../Controller.js";

interface PinnedPostProps {

}

export const PinnedPost = (props: PinnedPostProps, context: Context): JSX.Element => {
    const [page, setPage] = useState('menu');

    function startRun() {
        const controller = new Controller();
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
                    Tutorial
                </button>
                <button appearance="primary" onPress={() => setPage('store')}>
                    Store
                </button>
                <button appearance="primary" onPress={() => setPage('order')}>
                    Order Food
                </button>
                <spacer height="5%"/>
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
        store: <StoreScreen/>,
        order: <OrderScreen/>,
    };

    return pages[page] || Menu;
};