'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { useFormik } from 'formik'
import { twMerge } from 'tailwind-merge'

export default function LoginPage() {
  const router = useRouter()

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      })

      if (res?.error) {
        return
      }

      router.push('/documents/all')
    },
  })

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <form onSubmit={form.handleSubmit} className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Informe seu email"
            value={form.values.email}
            onChange={form.handleChange}
          />
        </div>

        <div>
          <Label>Senha</Label>
          <Input
            type="password"
            placeholder="Digite sua senha"
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
            {form.isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </footer>
      </form>
    </div>
  )
}
