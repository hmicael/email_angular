export class Listable<Type> {
  page!: number;
  limit!: number;
  total!: number;
  data!: Type;
}
