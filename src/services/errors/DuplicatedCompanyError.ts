export class DuplicatedCompanyError extends Error {
  constructor() {
    super('Invalid create company with duplicated name')
    this.name = 'DuplicatedCompanyError'
  }
}