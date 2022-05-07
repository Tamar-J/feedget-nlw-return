import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import CloseButton from "../../CloseButton";
import Loading from "../../Loading";
import ScreenshotButton from "../ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    handleRestartFeedback: () => void;
    onFeedbackSent: () => void;
}

export default function FeedbackContentStep(props: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState<string>('')
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

    const feedbackTypeInfo = feedbackTypes[props.feedbackType];
    
    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault()
        setIsSendingFeedback(true)
        
        await api.post('/feedbacks', {
            type: props.feedbackType,
            comment,
            screenshot
        })

        setIsSendingFeedback(false)
        props.onFeedbackSent()
    }




    return (
        <>
            <header>
                <button 
                    type="button" 
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={props.handleRestartFeedback}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4"/>
                </button>
                <div className="flex justify-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className={"w-6 h-6"}/>
                    <h4 className="text-xl leading-6">{feedbackTypeInfo.title}</h4>
                </div>
                <CloseButton/>
            </header>
            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 border-2  bg-transparent hover:border-brand-500 focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none rounded-md resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={({target}) => setComment(target.value)}
                    value={comment}
                >

                </textarea>
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTaken={setScreenshot}
                    />
                    <button
                        type="submit"
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                        disabled={comment.length === 0 || isSendingFeedback}
                    >
                        {isSendingFeedback ? <Loading /> : "Enviar feedback"}
                    </button>
                </footer>
            </form>
        </>
    )
}