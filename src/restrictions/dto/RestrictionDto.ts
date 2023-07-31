export class RestrictionDto {
  readonly name: string;
  readonly url: string;
  readonly hostname: string;
  readonly isAllowed: boolean;
  readonly restricted_count: number;
}
