import type { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { DomainEvent } from '@/core/events/domain-event.js'
import type { Question } from '../entities/question.js'

export class QuestionBestAnswerChosenEvent implements DomainEvent {
	public ocurredAt: Date
	public question: Question
	public BestAnswerId: UniqueEntityId

	constructor(question: Question, BestAnswerId: UniqueEntityId) {
		this.question = question
		this.BestAnswerId = BestAnswerId
		this.ocurredAt = new Date()
	}

	getAggregateId(): UniqueEntityId {
		return this.question.id
	}
}
