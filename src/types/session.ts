export interface ISession {
  readonly title: string;
  readonly start_time: Date;
  readonly end_time: Date;
  readonly duration: number;
  readonly focus_session_count: number;
  readonly break_count: number;
  readonly breaks_skipped: number;
  readonly notes: [];
  readonly tasks: [];
  readonly restrictions: [];
}
