import { useState } from "react"
import { Plus, Search, Eye, EyeOff, Copy, Edit2, Trash2, Globe, Mail, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface PasswordEntry {
  id: string
  site: string
  username: string
  password: string
  category: "web" | "email" | "mobile" | "other"
  lastModified: string
}

const mockPasswords: PasswordEntry[] = [
  {
    id: "1",
    site: "Gmail",
    username: "john@example.com",
    password: "Str0ng!P@ssw0rd123",
    category: "email",
    lastModified: "2 hours ago",
  },
  {
    id: "2",
    site: "GitHub",
    username: "johndoe",
    password: "G1thub!Secure2024",
    category: "web",
    lastModified: "1 day ago",
  },
  {
    id: "3",
    site: "Banking App",
    username: "john.doe",
    password: "B@nk!ng#Safe789",
    category: "mobile",
    lastModified: "3 days ago",
  },
]

const categoryIcons = {
  web: Globe,
  email: Mail,
  mobile: Smartphone,
  other: Globe,
}

export function PasswordVault() {
  const [passwords, setPasswords] = useState<PasswordEntry[]>(mockPasswords)
  const [searchTerm, setSearchTerm] = useState("")
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  const filteredPasswords = passwords.filter((password) =>
    password.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
    password.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`,
        duration: 2000,
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  const deletePassword = (id: string) => {
    setPasswords(prev => prev.filter(p => p.id !== id))
    toast({
      title: "Deleted",
      description: "Password entry has been deleted",
      duration: 2000,
    })
  }

  return (
    <section id="vault" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Secure <span className="text-gradient">Vault</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access and manage all your passwords in one secure, beautiful interface
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Search and Add Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search passwords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass"
              />
            </div>
            <Button variant="hero" className="group">
              <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
              Add Password
            </Button>
          </div>

          {/* Password Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPasswords.map((password) => {
              const CategoryIcon = categoryIcons[password.category]
              const isVisible = visiblePasswords.has(password.id)
              
              return (
                <div
                  key={password.id}
                  className="glass-card hover-lift group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <CategoryIcon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{password.site}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {password.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:text-destructive"
                        onClick={() => deletePassword(password.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Username */}
                  <div className="mb-3">
                    <label className="text-sm text-muted-foreground">Username</label>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-mono truncate">{password.username}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-2"
                        onClick={() => copyToClipboard(password.username, "Username")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label className="text-sm text-muted-foreground">Password</label>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-mono truncate">
                        {isVisible ? password.password : "••••••••••••"}
                      </span>
                      <div className="flex space-x-1 ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => togglePasswordVisibility(password.id)}
                        >
                          {isVisible ? (
                            <EyeOff className="h-3 w-3" />
                          ) : (
                            <Eye className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(password.password, "Password")}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-xs text-muted-foreground border-t border-white/10 pt-3">
                    Modified {password.lastModified}
                  </div>
                </div>
              )
            })}
          </div>

          {filteredPasswords.length === 0 && (
            <div className="text-center py-12">
              <div className="glass-card max-w-md mx-auto">
                <div className="p-8">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No passwords found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "Try adjusting your search term" : "Add your first password to get started"}
                  </p>
                  <Button variant="hero">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Password
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}