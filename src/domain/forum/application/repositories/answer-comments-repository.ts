import type { AnswerComment } from '../../enterprise/entities/answer-comment.js'

export interface AnswerCommentsRepository {
	create(answerComment: AnswerComment): Promise<void>
	findById(id: string): Promise<AnswerComment | null>
	delete(answerComment: AnswerComment): Promise<void>
}
