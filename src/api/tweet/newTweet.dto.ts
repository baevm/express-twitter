import { IsIn, IsString, MaxLength, MinLength } from 'class-validator'

export class NewTweetDto {
  @IsString()
  @MinLength(1, { message: 'Tweet text cant be less than 1 character' })
  @MaxLength(240, { message: 'Tweet text cant be more than 240 characters' })
  text: string

  media?: any

  @IsIn(['tweet', 'reply'])
  type: 'tweet' | 'reply'

  @IsString()
  parentId: string
}
