import { expect } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'

console.log('==================================')
console.log(matchers)
console.log('==================================')

expect.extend(matchers)
