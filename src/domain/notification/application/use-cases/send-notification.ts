import { type Either, right } from '@/core/either.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { Notification } from '../../enterprise/entities/notification.js'
import type { NotificationsRepository } from '../repositories/notification-repository.js'

interface SendNotificationUseCaseRequest {
	recipientId: string
	title: string
	content: string
}

type SendNotificationUseCaseResponse = Either<null, { notification: Notification }>

export class SendNotificationUseCase {
	constructor(private notificationRepository: NotificationsRepository) {}

	async execute({
		recipientId,
		content,
		title,
	}: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
		const notification = Notification.create({
			recipientId: new UniqueEntityId(recipientId),
			content,
			title,
		})

		await this.notificationRepository.create(notification)

		return right({
			notification,
		})
	}
}
