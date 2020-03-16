export class NumericalUtilities {
  public static parseNumber(str: string | number): number {
    if (typeof str === "number") return str;
    return Number(str.replace(/\D/g,""));
  }
}
