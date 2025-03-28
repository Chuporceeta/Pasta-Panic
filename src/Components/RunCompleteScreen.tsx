import {Context, Devvit, StateSetter, useState} from "@devvit/public-api";
import {Controller} from "../Controller.js";

interface RunCompleteScreenProps {
    username: string,
    coins: number,
    avatarURL: string,
    setPage: StateSetter<string>,
}

export const RunCompleteScreen = (props: RunCompleteScreenProps, context: Context): JSX.Element => {
    const seconds = String(Controller.instance.timeElapsed % 60).padStart(2, '0');
    const minutes = String(Math.floor(Controller.instance.timeElapsed / 60)).padStart(2, '0');

    const [earnings] = useState(Controller.instance.earnings);
    const [orders] = useState(Controller.instance.orders);
    const [difficulty] = useState(Controller.instance.difficulty);
    const [timeElapsed] = useState(Controller.instance.timeElapsed);


    async function postRun() {
        await context.redis.hSet(context.userId || '', {
            coins: (props.coins + earnings).toString(),
            order: JSON.stringify(null),
            url: props.avatarURL
        });
        const post = await context.reddit.submitPost({
            title: `Can you beat my time? (${orders.length} orders - ${difficulty})`,
            subredditName: context.subredditName ?? 'PastaPanic',
            preview: (
                <vstack height="100%" width="100%" alignment="middle center">
                    <text size="large">Loading ...</text>
                </vstack>
            ),
        });
        await context.redis.hSet(post.id, {
            orders: JSON.stringify(orders),
            difficulty: difficulty,
        });
        await context.redis.zAdd(`posts:${post.id}`, {
            member: props.username,
            score: timeElapsed
        })
        context.ui.navigateTo(post);
    }

    return (
        <zstack width='100%' height='100%'>
            <image
                url='Backgrounds/RunCompleteBackground.png'
                imageWidth={1436}
                imageHeight={1024}
                width='100%'
                height='100%'
            />
            <vstack alignment='center middle' width='100%' height='100%'>
                <spacer height='60px'/>
                <text style='heading' size='xxlarge' color='black'>Time: {minutes}:{seconds}</text>
                <text style='heading' size='xxlarge' color='black'>Coins earned: {earnings}</text>
                <spacer height='20px'/>
                <text size='xlarge' color='black'>Challenge others to beat your time?</text>
                <spacer height='5px'/>
                <button onPress={postRun}>Share Run</button>
                <spacer height='25px'/>
                <button onPress={async () => {
                    await context.redis.hSet(context.userId || '', {
                        coins: (props.coins + earnings).toString(),
                        order: JSON.stringify(null),
                        url: props.avatarURL
                    })
                    Controller.reset();
                    props.setPage('menu');
                }}>Save and Quit</button>
            </vstack>
        </zstack>
    );
}