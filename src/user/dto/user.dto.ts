import { Session } from 'src/session/session.schema';

export class UserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  sessions: Session[];
  readonly isInternal: boolean;
}
