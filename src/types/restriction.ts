export interface IRestriction {
  readonly _id: string;
  readonly name: string;
  readonly url: string;
  readonly hostname: string;
  readonly isAllowed: boolean;
  readonly restricted_count: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
