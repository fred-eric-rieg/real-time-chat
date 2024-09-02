import { Injectable, Signal, signal } from '@angular/core';

export interface Member {
  fullName: string,
  id: number
}

export interface Chat {
  isChannel: boolean,
  isThread: boolean,
  isDirectMessage: boolean,
  created: Date,
  name: string,
  description: string,
  createdBy: Member,
  members: Member[]
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: Chat = {
    isChannel: true,
    isThread: false,
    isDirectMessage: false,
    created: new Date(),
    name: "Main Channel",
    description: "Another channel about general stuff.",
    createdBy: { fullName: "Thomas Müller", id: 2 },
    members: [
      { fullName: "Hans Dieter", id: 1 },
      { fullName: "Thomas Müller", id: 2 },
      { fullName: "Klausi Mayer", id: 3 },
      { fullName: "Marie Löffel", id: 4 },
      { fullName: "Renate Bäcker", id: 5 },
      { fullName: "Ingrid Kaiser", id: 6 },
    ]
  }

  private dataSignal = signal<Chat[] | null>(null);

  constructor() { }


  // Method to set the Chat instances
  setDrawer(data: Chat[] | null) {
    this.dataSignal.set(data);
  }

  // Method to get the current Chat instances
  getDrawer(): Signal<Chat[] | null> {
    return this.dataSignal;
  }
}
