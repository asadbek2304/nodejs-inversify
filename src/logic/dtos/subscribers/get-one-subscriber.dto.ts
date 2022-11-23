export class GetOneSubscriberDto {
  constructor(public readonly id: string) {}

  static from(body: Partial<GetOneSubscriberDto>) {
    if (!body.id) {
      throw new Error('Missing property id')
    }

    return new GetOneSubscriberDto(body.id)
  }
}
