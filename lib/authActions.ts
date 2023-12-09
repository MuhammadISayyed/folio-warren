import { supabase } from './supabaseClient'

export async function signInWithEmail(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: 'http://localhost:5173/',
    },
  })
  if (error) console.log(error)
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) console.log(error)
}
