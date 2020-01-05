export class ArrayHelper {
  public static orderBy(
    data: any[],
    prop: string,
    direction: string = 'ASC',
  ): any[] {
    if (direction === 'ASC') {
      return data.sort((a: any, b: any) => a[prop].localeCompare(b[prop]));
    }

    return data.sort((a: any, b: any) => b[prop].localeCompare(a[prop]));
  }
}
