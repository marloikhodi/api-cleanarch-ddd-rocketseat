import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import {
	Question,
	type QuestionProps,
} from '@/domain/forum/enterprise/entities/question.js'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug.js'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
	const question = Question.create({
		title: 'Example Title',
		authorId: new UniqueEntityId(),
		content: 'Example Content',
		...override,
	})

	return question
}
