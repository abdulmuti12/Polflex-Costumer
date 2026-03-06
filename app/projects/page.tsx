import ProjectsClient from "@/components/projects-client"


export const revalidate = 86400

export const metadata = {
  title: "Our Projects - Homelogy Portfolio",
  description: "Explore our stunning furniture design and interior projects",
}

export default function Page() {
  return <ProjectsClient />
}