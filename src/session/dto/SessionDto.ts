import { Note } from 'src/notes/note.schema';
import { Restriction } from 'src/restrictions/restriction.schema';
import { Task } from 'src/tasks/tasks.schema';

export class SessionDto {
  readonly title: string;
  readonly start_time: Date;
  readonly end_time: Date;
  readonly duration: number;
  readonly focus_session_count: number;
  readonly break_count: number;
  readonly breaks_skipped: number;
  readonly notes: Note[];
  readonly tasks: Task[];
  readonly restrictions: Restriction[];
}
