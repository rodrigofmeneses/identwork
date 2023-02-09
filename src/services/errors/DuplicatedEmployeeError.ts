export class DuplicatedEmployeeError extends Error {
  constructor() {
    super('Invalid create company with duplicated id')
    this.name = 'DuplicatedEmployeeError'
  }
}