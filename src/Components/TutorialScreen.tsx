import {Context, Devvit, StateSetter, useState} from "@devvit/public-api";

interface TutorialProps {
    setPage: StateSetter<string>
}

export const TutorialScreen = (props: TutorialProps, context: Context): JSX.Element => {
    const [step, setStep] = useState(0);
    if (step > 1)
        props.setPage('menu');
    return (
        <zstack height='100%' width='100%' alignment='bottom end'>
            <image url={`Backgrounds/Tutorial${step}.png`} imageWidth={1436} imageHeight={1024} width='100%' height='100%'/>
            <vstack alignment='start'>
                <button onPress={() => setStep(step + 1)}>
                    Next
                </button>
                <spacer height='27px' width='98px'/>
            </vstack>
        </zstack>
    );
};