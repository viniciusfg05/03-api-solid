import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      ['src/http/controllers/**', 'prisma'] // Pasta que irá usar o novo ambiente prisma
    ]
  }
})

// Precisa baixa o pacote vitest-environment-prisma
// Dentro da pasta vitest-environment-prisma, run script: npm link
// Na raiz do projeto, run script: npm link vitest-environment-prisma
