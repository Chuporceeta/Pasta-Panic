import {Context, Devvit, useState} from "@devvit/public-api";
import {PinnedPost} from "./PinnedPost.js";
import {Order} from "../types.js";
import {Controller} from "../Controller.js";
import {SharedPost} from "./SharedPost.js";

export const Router: Devvit.CustomPostComponent = (context: Context) => {
    const [data] = useState<{
        coins: number,
        myOrder: Order | null,
        username: string,
        avatarURL: string,
        postType: string,
        redditOrders?: Record<string, string>,
        orders?: any,
        difficulty?: string,
    }>(async () => {
        const id = context.userId;
        const username = await context.reddit.getCurrentUsername();

        let coins = 10;
        let myOrder = null;
        let avatarURL = '';
        let postType = 'pinned';
        let redditOrders;

        if (username && id) {
            const userData = await context.redis.hMGet(id, ['coins', 'order', 'url']);
            if (userData) {
                if (userData[0])
                    coins = parseInt(userData[0]);
                if (isNaN(coins))
                    coins = 10;
                if (userData[1])
                    myOrder = JSON.parse(userData[1]);
                if (userData[2])
                    avatarURL = userData[2];
            }
            if (avatarURL == '')
                avatarURL = await context.reddit.getSnoovatarUrl(username) || '';
        }

        let [orders, difficulty] = await context.redis.hMGet(context.postId || '', ['orders', 'difficulty']);
        if (orders && difficulty) {
            orders = JSON.parse(orders);
            postType = 'shared';
        } else
            redditOrders = await context.redis.hGetAll('orders');

        return {
            coins: coins,
            myOrder: myOrder,
            username: username || '',
            avatarURL: avatarURL,
            postType: postType,
            redditOrders: redditOrders,
            orders: orders ?? undefined,
            difficulty: difficulty ?? undefined,
        };
    });

    Controller.instance.init(context, data.redditOrders);

    const posts: Record<string, JSX.Element> = {
        pinned: <PinnedPost coins={data.coins} myOrder={data.myOrder} avatarURL={data.avatarURL} username={data.username}/>,
        shared: <SharedPost coins={data.coins} myOrder={data.myOrder} avatarURL={data.avatarURL} username={data.username}
                            orders={data.orders} difficulty={data.difficulty || 'medium'} />
    };

    return posts[data.postType];
};