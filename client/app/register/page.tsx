import { RegisterForm } from "@/components/register-form"
import Image from "next/image"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block lg:w-1/2 bg-blue-50 relative">
        <Image
          src="/bg-pattern.svg" 
          alt="Background Pattern" 
          fill 
          className="absolute inset-0 opacity-10 object-cover"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2">Create an account</h1>
            <p className="text-muted-foreground">Enter your details to create a new account</p>
          </div>
          <RegisterForm />
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}