import { expect, test } from 'vitest'
import { Company } from './company'


test('create an company', () => {
  const company = new Company({
    name: 'Mare'
  })

  expect(company).toBeInstanceOf(Company)
  expect(company.name).toBe('Mare')
})

