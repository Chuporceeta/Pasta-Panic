import {Context, Devvit, useState} from "@devvit/public-api";
import {PinnedPost} from "./PinnedPost.js";
import {Order} from "../types.js";
import {Controller} from "../Controller.js";

export const Router: Devvit.CustomPostComponent = (context: Context) => {
    const [data] = useState<{
        coins: number,
        myOrder: Order | null,
        avatarURL: string,
        redditOrders: Record<string, string>,
    }>(async () => {
        const id = context.userId;
        const username = await context.reddit.getCurrentUsername();

        let coins = 0;
        let myOrder = null;
        let avatarURL = '';

        if (username && id) {
            const userData = await context.redis.hMGet(id, ['coins', 'order', 'url']);
            if (userData) {
                if (userData[0])
                    coins = parseInt(userData[0]);
                if (userData[1])
                    myOrder = JSON.parse(userData[1]);
                if (userData[2])
                    avatarURL = userData[2];
            }
            // if (avatarURL == '')
                avatarURL = await context.reddit.getSnoovatarUrl(username) || '';
            console.log(avatarURL);
        }

        const redditOrders = await context.redis.hGetAll('orders');

        return {
            coins: coins,
            myOrder: myOrder,
            avatarURL: avatarURL,
            redditOrders: redditOrders,
        };
    });

    Controller.instance.init(context, data.redditOrders);

    return (
        <PinnedPost coins={data.coins} myOrder={data.myOrder} avatarURL={data.avatarURL}/>
    );
};