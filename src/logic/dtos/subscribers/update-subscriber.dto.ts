export class UpdateSubscriberDto {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly channel?: string
  ) {}

  static from(body: Partial<UpdateSubscriberDto>) {
    if (!body.id) {
      throw new Error('Missing property id')
    }

    return new UpdateSubscriberDto(body.id, body.name, body.channel)
  }
}
