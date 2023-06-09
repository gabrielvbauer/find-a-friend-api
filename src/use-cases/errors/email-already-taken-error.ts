export class EmailAlreadyTakenError extends Error {
  constructor() {
    super('Email is already taken.')
  }
}
