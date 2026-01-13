import { NextResponse } from "next/server"

export async function GET() {
  await new Promise((res) => setTimeout(res, 800))

  const data = [
    { name: "Jan", total: 2400 },
    { name: "Feb", total: 1398 },
    { name: "Mar", total: 9800 },
    { name: "Apr", total: 3908 },
    { name: "May", total: 4800 },
    { name: "Jun", total: 3800 },
    { name: "Jul", total: 4300 },
    { name: "Aug", total: 5200 },
    { name: "Sep", total: 6100 },
    { name: "Oct", total: 7200 },
    { name: "Nov", total: 6800 },
    { name: "Dec", total: 7900 },
  ]

  return NextResponse.json(data)
}
