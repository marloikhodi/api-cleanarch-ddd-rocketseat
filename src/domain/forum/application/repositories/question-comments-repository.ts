import type { QuestionComment } from '../../enterprise/entities/question-comment.js'

export interface QuestionCommentsRepository {
	create(questionComment: QuestionComment): Promise<void>
	findById(id: string): Promise<QuestionComment | null>
	delete(questionComment: QuestionComment): Promise<void>
}
