export interface INote {
  readonly _id: string;
  readonly title: string;
  readonly description: string;
  readonly created_by: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
