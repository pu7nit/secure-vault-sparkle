import { Shield, Lock, Eye, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const floatingIcons = [
    { icon: Shield, delay: "0s", position: "top-20 left-20" },
    { icon: Lock, delay: "2s", position: "top-40 right-32" },
    { icon: Eye, delay: "4s", position: "bottom-40 left-32" },
    { icon: Zap, delay: "3s", position: "bottom-20 right-20" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Elements */}
      {floatingIcons.map((item, index) => (
        <item.icon
          key={index}
          className={`absolute h-12 w-12 text-accent/20 animate-float ${item.position}`}
          style={{ animationDelay: item.delay }}
        />
      ))}
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNSIgY3k9IjUiIHI9IjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center glass rounded-full px-4 py-2 mb-8">
            <Shield className="h-4 w-4 text-accent mr-2" />
            <span className="text-sm font-medium text-accent">Military-Grade Encryption</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Passwords,{" "}
            <span className="text-gradient">Secured</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the future of password management with our glassmorphism-designed vault. 
            Store, generate, and manage your digital life with complete confidence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button variant="hero" size="xl" className="group">
              Get Started Free
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
            <Button variant="glass" size="xl">
              Watch Demo
            </Button>
          </div>

          {/* Security Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "256-bit", label: "AES Encryption" },
              { number: "2M+", label: "Passwords Secured" },
              { number: "99.9%", label: "Uptime Guarantee" },
              { number: "0", label: "Breaches Ever" },
            ].map((stat, index) => (
              <div key={index} className="glass-card text-center hover-lift">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}