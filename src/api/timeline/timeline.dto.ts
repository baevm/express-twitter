export class GetUserTimelineDto {
  userId: string

  take: number

  cursor: string
}

export class GetHomeTimelineDto {
  take: number

  cursor: string
}
