import { Code2 } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Code2 className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold text-primary">TechCo</span>
    </div>
  )
}

