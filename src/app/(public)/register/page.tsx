'use client'

import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { twMerge } from 'tailwind-merge'

export default function RegisterPage() {
  const router = useRouter()

  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.message || 'Erro ao registrar')
        return
      }

      router.push('/login')
    },
  })

  return (
    <div className="max-w-md mx-auto mt-14 p-6">
      <h2 className="text-2xl font-medium mb-4">Crie uma conta</h2>

      <form onSubmit={form.handleSubmit} className="space-y-4">
        <div>
          <Label>Nome</Label>
          <Input
            placeholder="Informe seu nome"
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Seu melhor email"
            name="email"
            value={form.values.email}
            onChange={form.handleChange}
          />
        </div>

        <div>
          <Label>Senha</Label>
          <Input
            type="password"
            placeholder="Escolha sua senha"
            name="password"
            value={form.values.password}
            onChange={form.handleChange}
          />
        </div>

        <footer className="mt-10">
          <button
            type="submit"
            className={twMerge(
              'w-full bg-teal-700 text-white p-2 rounded-md font-medium cursor-pointer ',
              'hover:bg-teal-800 transition-colors duration-200'
            )}
            disabled={form.isSubmitting}
          >
            {form.isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </footer>
      </form>
    </div>
  )
}
