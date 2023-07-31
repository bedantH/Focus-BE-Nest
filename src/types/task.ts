import { Priority, Status } from 'src/tasks/tasks.schema';
import { User } from 'src/user/user.schema';

export interface ITask {
  readonly _id: string;
  readonly title: string;
  readonly description: string;
  readonly priority: Priority;
  readonly due_date: Date;
  readonly status: Status;
  readonly created_by: User;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
