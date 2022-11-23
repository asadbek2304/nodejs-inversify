import { injectable } from 'inversify'
import { DBContext } from '@data/db.context'
import { ISubscriber } from './subscribers.model'

@injectable()
export class SubscribersRepository {
  constructor(private readonly _dbContext: DBContext) {}

  async all() {
    return this._dbContext.subscriber.find({})
  }

  async findOne(id: ISubscriber['_id']) {
    return this._dbContext.subscriber.findById(id)
  }

  async create(entity: Partial<ISubscriber>) {
    return this._dbContext.subscriber.create(entity)
  }

  async updateOne(payload: Partial<ISubscriber>) {
    const foundSubscriber = await this._dbContext.subscriber.findById(
      payload._id
    )

    if (!foundSubscriber) {
      throw new Error('No subscriber found with the given id')
    }

    if (payload.name) {
      foundSubscriber.name = payload.name
    }

    if (payload.channel) {
      foundSubscriber.channel = payload.channel
    }

    return foundSubscriber.save()
  }

  async deleteOne(id: string) {
    await this._dbContext.subscriber.deleteOne({ _id: id })
    return true
  }
}
