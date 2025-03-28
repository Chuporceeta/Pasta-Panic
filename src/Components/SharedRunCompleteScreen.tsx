import {Context, Devvit, StateSetter, useState} from "@devvit/public-api";
import {Controller} from "../Controller.js";
import {Order} from "../types.js";

interface SharedRunCompleteScreenProps {
    coins: number,
    myOrder: Order | null,
    avatarURL: string,
    username: string,
    setPage: StateSetter<string>,
}

export const SharedRunCompleteScreen = (props: SharedRunCompleteScreenProps, context: Context): JSX.Element => {
    const seconds = String(Controller.instance.timeElapsed % 60).padStart(2, '0');
    const minutes = String(Math.floor(Controller.instance.timeElapsed / 60)).padStart(2, '0');

    const [timeElapsed] = useState(Controller.instance.timeElapsed);
    const [earnings] = useState(Controller.instance.earnings);
    const [scores] = useState(async () =>
        await context.redis.zRange(`posts:${context.postId}`, 0, 5, {by: 'rank'})
    );


    return (
        <zstack width='100%' height='100%'>
            <image
                url='Backgrounds/SharedRunCompleteBackground.png'
                imageWidth={1436}
                imageHeight={1024}
                width='100%'
                height='100%'
            />
            <vstack alignment='center middle' width='100%' height='100%'>
                <spacer height='60px'/>
                <text style='heading' size='xxlarge' color='black'>Your Time: {minutes}:{seconds}</text>
                <text style='heading' size='xxlarge' color='black'>Coins earned: {Controller.instance.earnings}</text>
                <spacer height='25px'/>
                <text style='heading' size='xxlarge' color='black'>Leaderboard</text>
                {
                    (scores as {score:number, member:string}[]).map((data) => {
                        const seconds = String(data.score % 60).padStart(2, '0');
                        const minutes = String(Math.floor(data.score / 60)).padStart(2, '0');
                        return <text color='black' size='large'>{data.member}: {minutes}:{seconds}</text>;
                    })
                }
                <spacer height='25px'/>
                <button onPress={async () => {
                    await context.redis.hSet(context.userId || '', {
                        coins: (props.coins + earnings).toString(),
                        order: JSON.stringify(props.myOrder),
                        url: props.avatarURL
                    });
                    await context.redis.zAdd(`posts:${context.postId}`, {
                        member: props.username,
                        score: timeElapsed
                    });
                    Controller.reset();
                    props.setPage('menu');
                }}>Save and Quit</button>
            </vstack>
        </zstack>
    );
}