import { NotAllowedError } from '@core/errors/errors/not-allowed-error.js'
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found-error.js'
import { type Either, left, right } from '@/core/either.js'
import type { AnswersRepository } from '../repositories/answers-repository.js'

interface DeleteAnswerUseCaseRequest {
	authorId: string
	answerId: string
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerUseCase {
	constructor(private answerRepository: AnswersRepository) {}

	async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
		const answer = await this.answerRepository.findById(answerId)

		if (!answer) {
			return left(new ResourceNotFoundError())
		}

		if (authorId !== answer.authorId.toString()) {
			return left(new NotAllowedError())
		}

		await this.answerRepository.delete(answer)

		return right({})
	}
}
