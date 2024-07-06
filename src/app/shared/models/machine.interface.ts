export interface Machine{
  id: number,
  name: string,
  state: string,
  events: Event[]
}

interface Event{
  id: number,
  date: string,
  hour: string
}
