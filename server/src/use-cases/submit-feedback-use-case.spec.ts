import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

describe('Submit feedback', () => {
    //spy functions
    const createFeedbackSpy = jest.fn()
    const sendMailSpy = jest.fn()

    const submitFeedback = new SubmitFeedbackUseCase(
        { create: createFeedbackSpy},
        { sendMail: sendMailSpy}
    )

    it('shold be able to submit a feedback', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemple comment',
            screenshot: 'data:image/png;base64,agqhasdfh341q123523'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();

    })

    it('shold not be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'exemple comment',
            screenshot: 'data:image/png;base64,agqhasdfh341q123523'
        })).rejects.toThrow()
    })

    it('shold not be able to submit a feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,agqhasdfh341q123523'
        })).rejects.toThrow()
    })

    it('shold not be able to submit a feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'bugado',
            screenshot: '523.jpg'
        })).rejects.toThrow()
    })
})