import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users,
  Lock,
  Key
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    title: "Total Passwords",
    value: "127",
    change: "+12 this month",
    positive: true,
    icon: Lock,
  },
  {
    title: "Strong Passwords",
    value: "94%",
    change: "+5% improvement",
    positive: true,
    icon: Shield,
  },
  {
    title: "Weak Passwords",
    value: "8",
    change: "-3 fixed this week",
    positive: true,
    icon: AlertTriangle,
  },
  {
    title: "Recently Added",
    value: "5",
    change: "Last 7 days",
    positive: true,
    icon: Clock,
  },
]

const recentActivity = [
  {
    action: "Added new password",
    site: "LinkedIn",
    time: "2 minutes ago",
    type: "success",
  },
  {
    action: "Updated password",
    site: "Banking App",
    time: "1 hour ago",
    type: "info",
  },
  {
    action: "Generated password",
    site: "New Account",
    time: "3 hours ago",
    type: "success",
  },
  {
    action: "Security alert",
    site: "Old Email",
    time: "1 day ago",
    type: "warning",
  },
]

const securityAlerts = [
  {
    type: "critical",
    message: "Weak password detected for GitHub",
    action: "Update now",
  },
  {
    type: "warning",
    message: "Password reused across 3 accounts",
    action: "Review",
  },
  {
    type: "info",
    message: "Enable 2FA for better security",
    action: "Setup",
  },
]

export function Dashboard() {
  return (
    <section id="dashboard" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Security <span className="text-gradient">Dashboard</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Monitor your password security and get insights to protect your digital life
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <stat.icon className="h-6 w-6 text-accent" />
                  </div>
                  <Badge 
                    variant="secondary"
                    className={stat.positive ? "text-success" : "text-destructive"}
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                  </Badge>
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm font-medium text-muted-foreground">{stat.title}</div>
                </div>
                <div className="text-xs text-muted-foreground">{stat.change}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="glass-card">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-accent" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/5 transition-colors duration-200">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "success" ? "bg-success" :
                      activity.type === "warning" ? "bg-warning" :
                      "bg-accent"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}
                      </p>
                      <p className="text-sm text-accent">{activity.site}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Alerts */}
            <div className="glass-card">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
                Security Alerts
              </h3>
              <div className="space-y-4">
                {securityAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start justify-between p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors duration-200">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          alert.type === "critical" ? "bg-destructive" :
                          alert.type === "warning" ? "bg-warning" :
                          "bg-accent"
                        }`} />
                        <Badge 
                          variant={alert.type === "critical" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {alert.type.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground mb-1">{alert.message}</p>
                    </div>
                    <button className="text-xs text-accent hover:text-accent/80 font-medium ml-4">
                      {alert.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security Score */}
          <div className="mt-8">
            <div className="glass-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-accent" />
                  Security Score
                </h3>
                <div className="text-3xl font-bold text-success">94/100</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Security</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div className="h-2 bg-success rounded-full" style={{ width: "94%" }} />
                    </div>
                    <span className="text-sm text-success font-medium">Excellent</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success mb-1">92%</div>
                    <div className="text-sm text-muted-foreground">Strong Passwords</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent mb-1">100%</div>
                    <div className="text-sm text-muted-foreground">Unique Passwords</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning mb-1">68%</div>
                    <div className="text-sm text-muted-foreground">2FA Enabled</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}