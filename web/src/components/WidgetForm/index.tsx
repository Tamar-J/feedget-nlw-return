import CloseButton from "../CloseButton";
import bugImageUrl from "../../assets/bug.svg"
import ideaImageUrl from "../../assets/idea.svg"
import thoughtImageUrl from "../../assets/thought.svg"
import { useState } from "react";
import FeedbackTypeStep from "./Steps/FeedbackTypeStep";
import FeedbackContentStep from "./Steps/FeedbackContentStep";
import FeedbackSuccessStep from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'lâmpada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'balão de pensamento'
        }

    }
}

export type FeedbackType = keyof typeof feedbackTypes;

export default function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback() {
        setFeedbackSent(false)
        setFeedbackType(null)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl text-center mb-4 flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            { feedbackSent ?
                <FeedbackSuccessStep handleRestartFeedback={handleRestartFeedback}/> :
                <>
                    {!feedbackType ? 
                        <FeedbackTypeStep setFeedbackType={setFeedbackType}/> : 
                        <FeedbackContentStep 
                            feedbackType={feedbackType} 
                            handleRestartFeedback={handleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                        
                    }
                </>

            }
            <footer>
                <small className="text-xs text-neutral-400">Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a></small>
            </footer>
        </div>
    )
}