import {Context, Devvit, useState} from "@devvit/public-api";

import {AssemblyStationScreen} from "../Components/AssemblyStationScreen.js";
import {KitchenScreen} from "../Components/KitchenScreen.js";
import {CounterScreen} from "../Components/CounterScreen.js";
import {StoreScreen} from "../Components/StoreScreen.js";
import {TutorialScreen} from "../Components/TutorialScreen.js";
import {OrderScreen} from "../Components/OrderScreen.js";
import {ScreenSwitcher} from "../Components/ScreenSwitcher.js";

interface PinnedPostProps {

}

export const PinnedPost = (props: PinnedPostProps, context: Context): JSX.Element => {
    const [page, setPage] = useState('menu');

    function startRun() {

        setPage('counter');
    }

    const Menu = (
        <vstack height="100%" width="100%" gap="medium" alignment="center middle">
            <spacer grow/>

            <image
                url="logo.png"
                description="logo"
                imageHeight={256}
                imageWidth={256}
                height="64px"
                width="64px"
            />
            <text size="xxlarge"> Pasta Panic! </text>
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
            <spacer grow/>
        </vstack>
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