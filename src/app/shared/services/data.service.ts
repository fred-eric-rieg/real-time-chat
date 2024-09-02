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

  private currentChannel = signal<Chat[]>([]);

  constructor() {
    // For testing, this single chat is inserted into the signal.
    this.setChats([this.data]);
  }


  // Method to set the Chat instances
  setChats(data: Chat[]) {
    this.currentChannel.set(data);
  }

  // Method to get the current Chat instances
  getChats(): Signal<Chat[]> {
    return this.currentChannel;
  }
}
