import { User } from 'src/user/user.schema';

export class NoteDto {
  readonly title: string;
  readonly description: string;
  readonly created_by: User;
}
