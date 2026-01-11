import { useTheme } from "next-themes"
// import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Moon, Sun } from "lucide-react"

export default function SettingsPage() {
//   const { setTheme, theme } = useTheme()
//   const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator />
      
      <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                    Update your personal information.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                        {/* <AvatarImage src={user?.avatar} /> */}
                        {/* <AvatarFallback className="text-lg">{user?.name?.charAt(0)}</AvatarFallback> */}
                    </Avatar>
                    <Button variant="outline">Change Avatar</Button>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    {/* <Input id="name" defaultValue={user?.name || "Chukwudi Lawal"} /> */}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    {/* <Input id="email" defaultValue={user?.email || "lawyer@lawpavillion.com"} disabled /> */}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    {/* <Input id="role" defaultValue={user?.role || "Senior Associate"} /> */}
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Changes</Button>
            </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                    Customize the look and feel of the dashboard.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Theme</Label>
                        <p className="text-sm text-muted-foreground">
                            Select your preferred theme for the dashboard.
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        {/* <Button 
                            variant={theme === "light" ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => setTheme("light")}
                            className="w-24 gap-2"
                        >
                            <Sun className="h-4 w-4" /> Light
                        </Button> */}
                        {/* <Button 
                            variant={theme === "dark" ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => setTheme("dark")}
                            className="w-24 gap-2"
                        >
                            <Moon className="h-4 w-4" /> Dark
                        </Button> */}
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
