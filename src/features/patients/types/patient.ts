export type Patient = {
  id: string
  name: string
  age: number
  gender: 'Male' | 'Female'
  condition: string
  status: 'Stable' | 'Critical' | 'Recovering'
  lastVisit: string
  doctor: string
  bloodGroup: string
}
