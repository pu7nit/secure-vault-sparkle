import { useState, useEffect } from "react"
import { RefreshCw, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface GeneratorOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
}

export function PasswordGenerator() {
  const [options, setOptions] = useState<GeneratorOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  })
  const [generatedPassword, setGeneratedPassword] = useState("")
  const [copied, setCopied] = useState(false)
  const [strength, setStrength] = useState(0)
  const { toast } = useToast()

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let charset = ""
    if (options.includeUppercase) charset += uppercase
    if (options.includeLowercase) charset += lowercase
    if (options.includeNumbers) charset += numbers
    if (options.includeSymbols) charset += symbols

    if (charset === "") {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      })
      return
    }

    let password = ""
    for (let i = 0; i < options.length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setGeneratedPassword(password)
    calculateStrength(password)
  }

  const calculateStrength = (password: string) => {
    let score = 0
    
    // Length bonus
    if (password.length >= 8) score += 25
    if (password.length >= 12) score += 25
    
    // Character variety bonus
    if (/[a-z]/.test(password)) score += 12.5
    if (/[A-Z]/.test(password)) score += 12.5
    if (/[0-9]/.test(password)) score += 12.5
    if (/[^A-Za-z0-9]/.test(password)) score += 12.5
    
    setStrength(Math.min(100, score))
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPassword)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
        duration: 2000,
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  const getStrengthColor = (strength: number) => {
    if (strength < 30) return "bg-destructive"
    if (strength < 60) return "bg-warning"
    if (strength < 80) return "bg-accent"
    return "bg-success"
  }

  const getStrengthLabel = (strength: number) => {
    if (strength < 30) return "Weak"
    if (strength < 60) return "Fair"
    if (strength < 80) return "Good"
    return "Strong"
  }

  useEffect(() => {
    generatePassword()
  }, [options])

  return (
    <section id="generator" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Password <span className="text-gradient">Generator</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate cryptographically secure passwords tailored to your needs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Generated Password */}
            <div className="space-y-6">
              <div className="glass-card">
                <h3 className="text-xl font-semibold mb-4">Generated Password</h3>
                
                {/* Password Display */}
                <div className="relative">
                  <div className="glass p-4 rounded-lg font-mono text-lg break-all min-h-[60px] flex items-center">
                    {generatedPassword || "Click generate to create a password"}
                  </div>
                  {generatedPassword && (
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(strength)}`}
                            style={{ width: `${strength}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${
                          strength < 30 ? "text-destructive" :
                          strength < 60 ? "text-warning" :
                          strength < 80 ? "text-accent" : "text-success"
                        }`}>
                          {getStrengthLabel(strength)}
                        </span>
                      </div>
                      <Button
                        variant="glass"
                        size="sm"
                        onClick={copyToClipboard}
                        className="group"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-success" />
                        ) : (
                          <Copy className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                onClick={generatePassword}
                className="w-full group"
              >
                <RefreshCw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                Generate New Password
              </Button>
            </div>

            {/* Options */}
            <div className="space-y-6">
              <div className="glass-card">
                <h3 className="text-xl font-semibold mb-4">Options</h3>
                
                {/* Length Slider */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <Label htmlFor="length" className="text-sm font-medium">
                      Length
                    </Label>
                    <span className="text-sm text-accent font-mono">
                      {options.length}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      id="length"
                      min="8"
                      max="128"
                      value={options.length}
                      onChange={(e) =>
                        setOptions(prev => ({ ...prev, length: parseInt(e.target.value) }))
                      }
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>8</span>
                    <span>128</span>
                  </div>
                </div>

                {/* Character Type Switches */}
                <div className="space-y-4">
                  {[
                    { key: "includeUppercase", label: "Uppercase Letters (A-Z)" },
                    { key: "includeLowercase", label: "Lowercase Letters (a-z)" },
                    { key: "includeNumbers", label: "Numbers (0-9)" },
                    { key: "includeSymbols", label: "Symbols (!@#$%^&*)" },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between">
                      <Label htmlFor={key} className="text-sm font-medium">
                        {label}
                      </Label>
                      <Switch
                        id={key}
                        checked={options[key as keyof GeneratorOptions] as boolean}
                        onCheckedChange={(checked) =>
                          setOptions(prev => ({ ...prev, [key]: checked }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Tips */}
              <div className="glass-card">
                <h4 className="font-semibold mb-3 text-accent">Security Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Use at least 12 characters for better security</li>
                  <li>• Include a mix of all character types</li>
                  <li>• Never reuse passwords across accounts</li>
                  <li>• Store passwords in a secure manager</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}