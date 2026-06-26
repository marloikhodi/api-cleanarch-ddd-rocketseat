import { makeNotification } from '@test/factories/make-notification.js'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error.js'
import { ReadNotificationUseCase } from './read-notification.js'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
	beforeEach(() => {
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
		sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
	})

	it('should be able to read a notification', async () => {
		const newNotification = makeNotification()

		inMemoryNotificationsRepository.create(newNotification)

		const result = await sut.execute({
			recipientId: newNotification.recipientId.toString(),
			notificationId: newNotification.id.toString(),
		})

		expect(result.isRight()).toBe(true)
		expect(inMemoryNotificationsRepository.items[0]?.readAt).toEqual(expect.any(Date))
	})

	it('should not be able to read a notification from another user', async () => {
		const newNotification = makeNotification({ recipientId: new UniqueEntityId('recipient-1') })

		inMemoryNotificationsRepository.create(newNotification)

		const result = await sut.execute({
			recipientId: 'recipient-2',
			notificationId: newNotification.id.toString(),
		})

		expect(result.isLeft()).toBe(true)
		expect(result.value).toBeInstanceOf(NotAllowedError)
	})
})
