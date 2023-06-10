export class CityCodeNotSpecifiedError extends Error {
  constructor() {
    super('The city code was not specified.')
  }
}
