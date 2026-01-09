import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">John Doe</p>
          <p className="text-sm text-muted-foreground">
            Researched "Contract Law in Nigeria"
          </p>
        </div>
        <div className="ml-auto font-medium text-muted-foreground text-sm">2m ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Amina Sadiq</p>
          <p className="text-sm text-muted-foreground">Opened Case #2024-001</p>
        </div>
        <div className="ml-auto font-medium text-muted-foreground text-sm">15m ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Chioma Nwachukwu</p>
          <p className="text-sm text-muted-foreground">
            Downloaded "Supreme Court Ruling 2023"
          </p>
        </div>
        <div className="ml-auto font-medium text-muted-foreground text-sm">1h ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Wale Kuti</p>
          <p className="text-sm text-muted-foreground">Updated Profile Settings</p>
        </div>
        <div className="ml-auto font-medium text-muted-foreground text-sm">3h ago</div>
      </div>
    </div>
  )
}
