import React from "react"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/user.actions"
import Sidebar from "@/components/Sidebar"

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return redirect("/sign-in")

  console.log("currentUser", currentUser)

  console.log("children", children)

  return (
    <main className="flex h-screen">
      <div className="hidden md:block">
        <Sidebar {...currentUser} />
      </div>

      <section className="flex w-full flex-col">
        <div className="md:hidden">MOBILENAV</div>
        <div className="h-screen">{children}</div>
      </section>
    </main>
  )
}

export default Layout
