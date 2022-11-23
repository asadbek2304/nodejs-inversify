import { injectable } from 'inversify'
import { SubscribersRepository } from '@data/subscribers.repository'
import {
  CreateSubscriberDto,
  GetOneSubscriberDto,
  UpdateSubscriberDto,
} from '../dtos'
import { SubscriberDto } from '../dtos/subscribers/subscriber.dto'
import { CouldNotFoundException } from '../exceptions'

@injectable()
export class SubscribersService {
  constructor(private readonly _subscribersRepo: SubscribersRepository) {}

  async all() {
    const subscribers = await this._subscribersRepo.all()
    return SubscriberDto.fromMany(subscribers)
  }

  async findOne(getOneSubscriberDto: GetOneSubscriberDto) {
    const foundSubscriber = await this._subscribersRepo.findOne(
      getOneSubscriberDto.id
    )
    if (!foundSubscriber) {
      throw new CouldNotFoundException('subscriber')
    }
    return SubscriberDto.from(foundSubscriber)
  }

  async create(createSubscriberDto: CreateSubscriberDto) {
    const createdSubscriber = await this._subscribersRepo.create(
      createSubscriberDto
    )
    return SubscriberDto.from(createdSubscriber)
  }

  async updateOne(updateSubscriberDto: UpdateSubscriberDto) {
    const updatedSubscriber = await this._subscribersRepo.updateOne({
      _id: updateSubscriberDto.id,
      name: updateSubscriberDto.name,
      channel: updateSubscriberDto.channel,
    })

    return SubscriberDto.from(updatedSubscriber)
  }

  async deleteOne({id}: GetOneSubscriberDto) {
    return this._subscribersRepo.deleteOne(id)
  }
}
